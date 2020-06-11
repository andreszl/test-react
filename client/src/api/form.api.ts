import request from '../utils/request.util';
import { IStoreForm } from '../interfaces/form.interface'; // eslint-disable-line no-unused-vars


export async function save() {

	return request({
		base: 'https://httpbin.org/',
		url: 'post',
		method: 'POST',
	});
}
