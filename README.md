![logo](https://raw.githubusercontent.com/Bartekkur1/janpa-js/master/images/janpa-js-logo.png)
### Small, simple express.js extension built in TypeScript that helps you develop your project with clean and straightforward architecture

## Basic usage

Example project index.ts file where we define our server:
```ts
JanpaServerRunner.builder()
	.addExpressBase(ExpressServer)
	.registerService(server  => {
		server.registerService(DatabaseService);
		server.registerService(UserService);
	})
	.registerController(server  => {
		server.registerController(UserController);
	})
	.startServer();
```
### Let me explain the building process.

	.addExpressBase(app: ExpressBase)
Every express server related things as: routes, middleware etc. will be based on given class that extends ExpressBase interface.

```ts
interface ExpressBase {
	app: Express;
	init(): Promise<Express>;
	start(): Promise<any>;
}
```

in init function app: Express instance must be created!

```ts
  this.app = express();
```


Janpa server calls init function, checks if app is created,  adds decorated controller routes to app router and finally calls start method.

```ts
export  class  ExpressServer  implements  ExpressBase {

	app: Express;
	
	async  init(): Promise<any> {
		this.app = express();
		this.app.use((req, res: Response, next) => {
		res.header("Access-Control-Allow-Origin", "*");
	}

	async  start(): Promise<any> {
		this.app.use(async (req: Request, res: Response) => {
			res.sendStatus(404);
		});
		this.app.listen(conf.PORT, conf.HOST_NAME, 0, () => {
			console.log(`Express server is running on ${conf.HOST_NAME}:${conf.PORT}`);
		});
	}
}
```

<hr>


Janpa server adds routes to app between init and start call so make sure that you don't add that not found route inside init method because it will override your routes.
	
	.registerService(callback : (c: ServiceRegister) =>  any)

Adds services to janpa server dependency injection container - use as shown above in code, more on this later.

	.registerController(callback: (c: ControllerRegister) =>  any)

Janpa server keeps track of all added controllers - It is needed to make route decorators work.

	.startServer()

Janpa server calls given express base instance start method.

## Why janpa-js makes your express project better?
Answer is simple - clean architecture.
By using janpa-js your project structure is simpler.

Example suggested project structure:
	
	- index.ts
	/src
		/controller
			- UserController.ts
		/service
			- UserService.ts
		/model
			- User.ts


All added services to janpa server can be accessed by @Service() decorator inside your controller.

```ts
export  class  UserController {

	@Service()
	private  userService: UserService;

	@Get("/register")
	private  async  register(req: Request, res: Response): Promise<void> {
		try {
			this.userService.registerUser(requestToUser(req));
			res.sendStatus(200);
		} catch(e) {
			res.sendStatus(e.code).json(e.message);
		}
	}
}
```
You can use built in controller path decorator like:
```ts
	@Get("/route")
	@Post("/route")
	@Put("/route")
	@Delete("/route")
```

<hr>

### I know a lot of things are missing and somethings can be done much better but it is version 0.0.x so pls be patient. I'm still working on it 😎
If you somehow decide to use this tool and you have trouble using it you can contact me on
* Discord: Bajtek#6677
* Email: Bartekkur1@gmail.com
