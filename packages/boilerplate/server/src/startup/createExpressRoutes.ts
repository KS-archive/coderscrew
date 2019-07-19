import { GraphQLServer } from 'graphql-yoga';
import passport from 'passport';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

const enhanceResByToken = (res: Response, userId: string) => {
  const token = sign({ userId }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  return res;
};

const createExpressRoutes = (server: GraphQLServer) => {
  server.express.post('/auth/signup', passport.authenticate('signup', { session: false }), async (req, res) => {
    if (typeof req === 'string') {
      res.status(404).send({ message: req });
    }
    res = enhanceResByToken(res, req.user.id);
    res.status(200).send(req.user);
  });

  server.express.post('/auth/signin', passport.authenticate('signin', { session: false }), async (req, res) => {
    res = enhanceResByToken(res, req.user.id);
    res.status(200).send(req.user);
  });

  server.express.get('/auth/github', passport.authenticate('github'));

  server.express.get('/auth/github/callback', passport.authenticate('github'), async (req, res) => {
    res = enhanceResByToken(res, req.user.id);
    res.status(200).redirect('http://localhost:3000/');
  });

  server.express.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

  server.express.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    res = enhanceResByToken(res, req.user.id);
    res.status(200).redirect('http://localhost:3000/');
  });

  server.express.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  server.express.get('/auth/facebook/callback', passport.authenticate('facebook'), async (req, res) => {
    res = enhanceResByToken(res, req.user.id);
    res.status(200).redirect('http://localhost:3000/');
  });
};

export default createExpressRoutes;
