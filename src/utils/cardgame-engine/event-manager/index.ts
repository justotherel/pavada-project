import { Registry } from './interfaces/registry';
import { Subscriber } from './interfaces/subscriber';

export interface IEventBus {
  dispatch<T>(event: string, arg?: T): void;
  register(event: string, callback: Function): Registry;
}

export class EventManager implements IEventBus {
  private subscribers: Subscriber;
  private static nextId = 0;
  private static _instance?: EventManager = undefined;

  private constructor() {
    this.subscribers = {};
  }

  public static get instance(): EventManager {
    if (this._instance === undefined) {
      this._instance = new EventManager();
    }

    return this._instance;
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscriber = this.subscribers[event];

    if (subscriber === undefined) {
      return;
    }

    Object.keys(subscriber).forEach((key) => subscriber[key](arg));
  }

  public register(event: string, callback: Function): Registry {
    const id = this.getNextId();
    if (!this.subscribers[event]) this.subscribers[event] = {};

    this.subscribers[event][id] = callback;

    return {
      unregister: () => {
        delete this.subscribers[event][id];
        if (Object.keys(this.subscribers[event]).length === 0) delete this.subscribers[event];
      },
    };
  }

  private getNextId(): number {
    return EventManager.nextId++;
  }
}

// example of usage

const sub1 = EventManager.instance.register('EVENT1', (arg: string) => {
  if (arg) {
    console.log('sub1 called, got arg: ' + arg);
  } else {
    console.log('Got no args, sub1 called');
  }
});

const sub2 = EventManager.instance.register('EVENT1', (arg: string) => {
  if (arg) {
    console.log('sub2 called, got arg: ' + arg);
  } else {
    console.log('Got no args, sub2 called');
  }
});

const sub3 = EventManager.instance.register('EVENT1', (arg: string) => {
  if (arg) {
    console.log('sub3 called, got arg: ' + arg);
  } else {
    console.log('Got no args, sub3 called');
  }
});

const sub4 = EventManager.instance.register('EVENT2', (arg: string) => {
  if (arg) {
    console.log('sub4 called, got arg: ' + arg);
  } else {
    console.log('Got no args, sub4 called');
  }
});

EventManager.instance.dispatch<string>('EVENT1', 'gay');
EventManager.instance.dispatch<string>('EVENT2');
sub2.unregister();
EventManager.instance.dispatch<string>('EVENT1');
EventManager.instance.dispatch<string>('EVENT2');
