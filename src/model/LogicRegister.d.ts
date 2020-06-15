import { Constructor } from "./Constructor";

export interface LogicRegister extends ControllerRegister, ServiceRegister, MiddlewareRegister { }

export interface MiddlewareRegister {
    registerMiddleware<T extends Object>(obj: Constructor<T>, name?: string): void
}

export interface ServiceRegister {
    registerService<T extends Object>(obj: Constructor<T>, name?: string): void
}

export interface ControllerRegister {
    registerController<T extends Object>(obj: Constructor<T>, name?: string): void
}