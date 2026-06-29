import express, { Router } from 'express';

interface Options{
  port?: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  public constructor(options: Options) {
    const { port = 3000, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  public async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Usar las rutas definidas
    this.app.use(this.routes);

    // Escuchar el puerto
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
