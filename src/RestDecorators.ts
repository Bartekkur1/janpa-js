import { Container } from './Container';
import { JanpaRouter } from './JanpaRouter';
import { JanpaPath } from './model/JanpaPath';
import { HttpMethod } from './enum/HttpMethod';
import { RequestHandler } from 'express';

export function Middleware(pathName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let router = Container.getInstance.getServiceInstance(JanpaRouter);
        router.addRoute(xpressPathCreator("Middleware", pathName, descriptor.value));
    }
}

export function Get(pathName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let router = Container.getInstance.getServiceInstance(JanpaRouter);
        router.addRoute(xpressPathCreator(HttpMethod.GET, pathName, descriptor.value));
    }
}

export function Post(pathName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let router = Container.getInstance.getServiceInstance(JanpaRouter);
        router.addRoute(xpressPathCreator(HttpMethod.POST, pathName, descriptor.value));
    }
}

export function Put(pathName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let router = Container.getInstance.getServiceInstance(JanpaRouter);
        router.addRoute(xpressPathCreator(HttpMethod.PUT, pathName, descriptor.value));
    }
}

export function Delete(pathName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let router = Container.getInstance.getServiceInstance(JanpaRouter);
        router.addRoute(xpressPathCreator(HttpMethod.DELETE, pathName, descriptor.value));
    }
}

function xpressPathCreator(httpMethod: HttpMethod | "Middleware", pathName: string, method: RequestHandler) {
    return <JanpaPath>{
        method: httpMethod,
        name: pathName,
        action: method
    };
}