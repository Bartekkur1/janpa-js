import { Express } from 'express';

export interface ExpressBase {
    app: Express;
    init(): Promise<any>;
    start(): Promise<any>;
}