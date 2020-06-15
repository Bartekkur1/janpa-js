import "reflect-metadata";
import { ContainerCell } from "./model/ContainerCell";
import { Constructor } from "./model/Constructor";
import { LogicRegister } from "./model/LogicRegister";

export class Container implements LogicRegister {

    private static instance: Container;
    private ContainerCells: ContainerCell<any>[] = [];

    static get getInstance() {
        if (!this.instance) {
            this.instance = new Container();
        }

        return this.instance;
    }

    public registerMiddleware<T extends Object>(obj: Constructor<T>, name?: string): void {
        this.registerService(obj, name);
    }

    public registerController<T>(obj: Constructor<T>, name?: string): void {
        this.registerService(obj, name);
    }

    public registerService<T>(obj: Constructor<T>, name?: string): void {
        let cell: ContainerCell<T> = {
            instance: new obj(obj.name),
            name: name || obj.name
        };

        if (this.findService(cell.name) === null) {
            this.ContainerCells.push(cell);
        }
    }

    public getServiceInstance<T>(obj: Constructor<T>): T {
        if (this.findService(obj.name) === null) {
            this.registerService(obj, obj.name);
        }
        let cell = this.findService<T>(obj.name);
        return cell.instance;
    }

    public getBeanInstanceByName<T>(name: string): T {
        let cell = this.findService<T>(name);
        if (cell === null) {
            throw Error(`Bean ${name} not found in container!`);
        }
        return cell.instance;
    }

    private findService<T>(name: string): ContainerCell<T> {
        return this.ContainerCells.find(c => c.name == name) || null;
    }
}

export function Service() {
    return function (target: Object, key: string | symbol) {
        Object.defineProperty(target, key, {
            get: () => {
                let type = Reflect.getMetadata("design:type", target, key);
                if (!type)
                    throw new Error(`Failed to get property ${key.toString()} type`);
                return Container.getInstance.getServiceInstance(type.name);
            },
        });
    };
}