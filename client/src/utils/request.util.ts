import axios from 'axios';
import { IConfiguration } from '../interfaces/request.interface'; // eslint-disable-line no-unused-vars

async function request(configuration: IConfiguration) {
	const port = '3001';
	const host = `http://localhost:${port}`;
	const base = configuration.base || `${host}/api/`;
	const path = base + configuration.url;

	const fetch = {
		url: path,
		headers: configuration.headers || {},
		method: configuration.method || 'GET',
		data: configuration.body || {},
	};

	return axios(fetch)
		.then((res) => res.data)
		.catch((err: Error) => {
			console.log(err, err.message);
			throw err;
		});
}

export default request;
