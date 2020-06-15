import { JanpaServer } from "./JanpaServer";
import { ExpressBase } from "./model/ExpressBase";
import { Constructor } from "./model/Constructor";
import { ServiceRegister, ControllerRegister, MiddlewareRegister } from "./model/LogicRegister";

export class JanpaServerRunner {
    private server: JanpaServer;

    constructor() {
        this.server = new JanpaServer();
    }

    public static builder() {
        return new JanpaServerRunner();
    }

    public reset() {
        this.server = new JanpaServer();
    }
    
    public getJanpaServer() {
        return this.server;
    }

    public getExpressServer() {
        return this.server.getExpressServer();
    }

    public addExpressBase(app: Constructor<ExpressBase>) {
        this.server.addExpressBase(app);
        return this;
    }

    public registerService(callback : (c: ServiceRegister) => any) {
        this.server.registerServices(callback);
        return this;
    }

    public registerController(callback: (c: ControllerRegister) => any) {
        this.server.registerServices(callback);
        return this;
    }

    public registerMiddleware(callback: (c: MiddlewareRegister) => any) {
        this.server.registerServices(callback);
        return this;
    }

    async startServer() {
        if(this.server === null) {
            throw Error("Server is not defined");
        }
        this.server.start();
    }
}