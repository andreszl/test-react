import express, { Application } from 'express';	// eslint-disable-line no-unused-vars
import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import morgan from 'morgan';
import cors from 'cors';
import cons from 'consolidate';
import * as uni from './app';

import { modules } from './graphql';

const { schema, context } = modules;

class Server {
	public path: string;
	public app: Application;
	public server: ApolloServer
	public port: number;

	constructor() {
		this.path = config.get('graphql.path');
		this.port = config.get('express.port');
		this.app = express();
		this.server = new ApolloServer({ schema, context, introspection: true });
		this.config();
		this.routes();
	}

	config() {
		this.app.set('port', this.port || 3001);
		this.app.use(express.static(config.get('public')));
		this.app.set('views', config.get('public'));
		this.app.use(express.static(config.get('assets')));
		this.app.engine('html', cons.swig);
		this.app.set('view engine', 'html');
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	routes() {
		this.server.applyMiddleware({ app: this.app, path: this.path });
		this.app.get('*', (uni.handleRender));
	}

	start() {
		this.app.listen(this.app.get('port'), (): void => {
			console.log(`🚀 Server ready at http://${config.get('express.host')}:${this.app.get('port')}`);
		});
	}
}

export default new Server();
