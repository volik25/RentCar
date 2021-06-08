import { UserSessionInterface } from '@rent/interfaces/modules/security/interfaces/user.session.interface'
import { FastifyRequest } from 'fastify';
import FastifySessionPlugin from 'fastify-session';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Session extends Record<string, any> {
  sessionId: string;
  encryptedSessionId: string;
  user: UserSessionInterface;
  token: string;

  touch(): void;

  regenerate(): void;
}

export interface ApplicationRequest extends FastifyRequest {
  session: Session;
  sessionStore: FastifySessionPlugin.SessionStore;

  destroySession(callback: (err?: Error) => void): void;
}