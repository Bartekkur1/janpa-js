import { Container } from './Container';
import { ExpressBase } from './model/ExpressBase';
import { JanpaRouter } from './JanpaRouter';
import { Constructor } from './model/Constructor';

export class JanpaServer {

    private container: Container = null;
    private expressServer: ExpressBase = null;

    constructor() {
        this.container = Container.getInstance;
    }

    public getExpressServer() {
        return this.expressServer.app;
    }

    public async start() {
        await this.expressServer.init();
        let router = Container.getInstance.getServiceInstance(JanpaRouter);
        router.registerRoutes(this.expressServer.app);
        await this.expressServer.start();
    }

    public registerServices(callback: (c: Container) => any) {
        callback(this.container);
    }

    public addExpressBase(expressBase: Constructor<ExpressBase>) {
        this.container.registerService(expressBase, "ExpressServer");
        this.expressServer = this.container.getServiceInstance(expressBase);
    }
    
}