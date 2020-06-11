import { RouteComponentProps, RouteChildrenProps } from 'react-router-dom'; // eslint-disable-line no-unused-vars

export interface IRouteProps {
	component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>|any;
	render?: (props: RouteComponentProps<any>) => React.ReactNode;
	routes?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
	path?: string | string[];
	exact?: boolean;
	sensitive?: boolean;
	strict?: boolean;
	status?: number,
}

export interface IRouteRedux {
	location: {
		pathname: string,
		search: string,
		hash: string,
		state: any,
		key: string,
	},
	match: {
		path: string,
		url: string,
		params: {
			id?: string,
			type?: string,
			type_id?: string,
			business_id?: string,
			client_id?: string,
			scanner_id?: string,
		},
		isExact: boolean,
	}
}


export const initialStateRouteRedux: IRouteRedux = {
	location: {
		pathname: '',
		search: '',
		hash: '',
		state: undefined,
		key: '',
	},
	match: {
		path: '',
		url: '',
		params: { id: '' },
		isExact: false,
	},
};
