import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(message = 'World'): string {
    return `Hello ${message}!`;
  }
}
