import { Callable } from './callable';

export interface Subscriber {
  [key: string]: Callable;
}
