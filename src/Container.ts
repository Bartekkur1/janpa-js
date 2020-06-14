import "reflect-metadata";
import { ContainerCell } from "./model/ContainerCell";
import { Constructor } from "./model/Constructor";
import { ControllerRegister } from "./model/ControllerRegister";
import { ServiceRegister } from "./model/ServiceRegister";

export class Container implements ControllerRegister, ServiceRegister {

    private static instance: Container;
    private ContainerCells: ContainerCell<any>[] = [];

    static get getInstance() {
        if (!this.instance) {
            console.log("<- Creating container instance...");
            this.instance = new Container();
            console.log("-> Container instance created");
        }

        return this.instance;
    }

    public registerController<T>(obj: Constructor<T>, name?: string): void {
        this.registerService(obj, name);
    }

    public registerService<T>(obj: Constructor<T>, name?: string): void {
        console.log(`Registering service ${obj.name}...`);
        let cell: ContainerCell<T> = {
            instance: new obj(obj.name),
            name: name || obj.name
        };

        if (this.findService(cell.name) === null) {
            this.ContainerCells.push(cell);
            console.log(`- Successfully registered ${cell.name} service`);
        } else {
            console.log(`- Failed to register ${cell.name}, service already exists`);
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