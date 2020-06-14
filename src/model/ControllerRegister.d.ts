import { Constructor } from './Constructor';

export interface ControllerRegister {
    registerController<T extends Object>(obj: Constructor<T>, name?: string): void
}