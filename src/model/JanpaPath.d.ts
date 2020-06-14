import { RequestHandler } from 'express';
import { HttpMethod } from '../enum/HttpMethod';

export interface JanpaPath {
    method: HttpMethod;
    name: string;
    action: RequestHandler;
}