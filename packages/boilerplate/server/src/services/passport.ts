import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { hash, compare } from 'bcrypt';
import { prisma, User } from 'generated/prisma-client';

passport.serializeUser((user: { id: string }, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = (await prisma.user({ id })) as User;
    done(null, user);
  } catch (ex) {
    done(ex);
  }
});

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { name } = req.body;
      const hashedPassword = await hash(password, 10);

      const user = await prisma.createUser({
        name,
        email,
        password: hashedPassword,
      });

      return done(null, user);
    },
  ),
);

passport.use(
  'signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = (await prisma.user({ email })) as User;
        if (!user) return done("User with provided e-mail doesn't exist");

        if (!user.password) return done('That account was created via social login');

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) return done('Wrong password');

        return done(null, user);
      } catch (ex) {
        return done(ex);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, { id, displayName, emails }, done) => {
      let user = await prisma.user({ githubId: id });

      try {
        if (!user) {
          user = await prisma.createUser({
            name: displayName,
            email: emails![0].value,
            githubId: id,
          });
        }
        return done(null, user);
      } catch (ex) {
        return done(ex);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, { id, displayName, emails }, done) => {
      let user = await prisma.user({ googleId: id });

      try {
        if (!user) {
          user = await prisma.createUser({
            name: displayName,
            email: emails![0].value,
            googleId: id,
          });
        }
        return done(undefined, user);
      } catch (ex) {
        return done(ex);
      }
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    async (accessToken, refreshToken, { id, displayName, emails }, done) => {
      let user = await prisma.user({ facebookId: id });

      try {
        if (!user) {
          user = await prisma.createUser({
            name: displayName,
            email: emails![0].value,
            facebookId: id,
          });
        }
        return done(null, user);
      } catch (ex) {
        return done(ex);
      }
    },
  ),
);
