import { JanpaPath } from "./model/JanpaPath";
import { Express } from "express";
import { HttpMethod } from './enum/HttpMethod';

export class JanpaRouter {

    private routes: JanpaPath[] = [];

    public addRoute(route: JanpaPath) {
        this.routes.push(route);
    }

    public registerRoutes(app: Express) {
        this.routes.filter(r => r.method === HttpMethod.GET).forEach(r => {
            app.get(r.name, r.action);
        });
        this.routes.filter(r => r.method === HttpMethod.POST).forEach(r => {
            app.post(r.name, r.action);
        });
        this.routes.filter(r => r.method === HttpMethod.PUT).forEach(r => {
            app.put(r.name, r.action);
        });
        this.routes.filter(r => r.method === HttpMethod.DELETE).forEach(r => {
            app.delete(r.name, r.action);
        });
    }
}