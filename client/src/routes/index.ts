import Form from '../components/form.component';
import { IRouteProps } from '../interfaces/routes.interface'; // eslint-disable-line no-unused-vars

const routes: IRouteProps[] = [
	{
		path: '*',
		exact: true,
		component: Form,
		strict: true,
	},
];

export default routes;
