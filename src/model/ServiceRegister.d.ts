import { Constructor } from './Constructor';

export interface ServiceRegister {
    registerService<T extends Object>(obj: Constructor<T>, name?: string): void
}