import { RequestHandler } from 'express';
import { HttpMethod } from '../enum/HttpMethod';

export interface JanpaPath {
    method: HttpMethod | "Middleware";
    name: string;
    action: RequestHandler;
}