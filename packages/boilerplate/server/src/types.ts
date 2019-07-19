/* eslint-disable @typescript-eslint/no-namespace */
import { PubSub } from 'graphql-yoga';
import { Prisma } from 'generated/prisma-client';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
    }
  }
}

export interface Context {
  prisma: Prisma;
  request: Request;
  pubsub: PubSub;
}
