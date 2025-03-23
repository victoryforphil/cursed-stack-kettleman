// Type declarations to fix @elysiajs/cookie and other plugin compatibility issues
declare module '@elysiajs/cookie' {
  import { Elysia, Plugin } from 'elysia';

  export interface Cookie<T> {
    value: T;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  }

  export interface CookieRequest {
    [key: string]: unknown;
  }

  export function cookie(config?: any): Plugin;
}

// Override definitions for other problematic plugins if needed
declare module '@elysiajs/cors' {
  import { Elysia, Plugin } from 'elysia';
  export function cors(config?: any): Plugin;
}

declare module '@elysiajs/swagger' {
  import { Elysia, Plugin } from 'elysia';
  export function swagger(config?: any): Plugin;
}

declare module '@elysiajs/jwt' {
  import { Elysia, Plugin } from 'elysia';
  export function jwt(config?: any): Plugin;
}

declare module '@elysiajs/opentelemetry' {
  import { Elysia, Plugin } from 'elysia';
  export function opentelemetry(config?: any): Plugin;
} 