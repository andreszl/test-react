import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';
import { IRouteProps } from '../interfaces/routes.interface'; // eslint-disable-line no-unused-vars

import '../stylesheet/index.less';

interface Props {
}

interface State {
}
class App extends Component<Props, State> {

	constructor(props: Readonly<Props>) {
		super(props);
		this.state = {
		};
	}


	render() {

		return (
			<div>
				<Switch>
					{
						routes.map((
							route: IRouteProps,
						) => {
							const key = `${route.path}`;
							return (
								<Route
									key={key}
									path={route.path}
									render={(props) => {
										return <route.component {...props} routes={route.routes} />;
									}}
								/>
							);
						})
					}
				</Switch>
			</div>
		);
	}
}


export default App;
