import { GraphQLServer } from 'graphql-yoga';
import passport from 'passport';
import { json } from 'body-parser';
import { verify } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

const runExpressMiddleware = (server: GraphQLServer) => {
  server.express.use(cors(corsOptions));
  server.express.use(cookieParser());
  server.express.use(json());
  server.express.use(passport.initialize());

  server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      try {
        const { userId } = verify(token, process.env.JWT_SECRET) as { userId: string };
        req.userId = userId || undefined;
      } catch (ex) {
        req.userId = undefined;
      }
    }
    next();
  });
};

export default runExpressMiddleware;
