import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import $ from 'jquery';
import currencyFormatter from 'currency-formatter';
import { isEmpty } from 'lodash';
import { IReduxState } from '../interfaces/reduxState.interface'; // eslint-disable-line no-unused-vars
import { IForm, IValidateFormAction } from '../interfaces/form.interface'; // eslint-disable-line no-unused-vars

import actions from '../actions';

interface Props {
	propsForm: IForm;
	validateForm: IValidateFormAction;
	field: string;
	name: string;
}

interface State {

}

class Input extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}


	componentDidMount() {
		const { field } = this.props;
		let timeout: NodeJS.Timeout;
		$(`.add-change-event-${field}`).keyup(() => {
			const { propsForm } = this.props;

			let unformated = (String)(currencyFormatter.unformat((String)(propsForm[field].payload), { code: 'USD' }));

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				unformated = (Number)(unformated).toFixed(2);
				this.validateForm(currencyFormatter.format((Number)(unformated), { code: 'USD' }), field);
				clearTimeout(timeout);
			}, 1200);
		});
	}

	validateForm(value: any, field: string|null = null) {
		const { validateForm, propsForm } = this.props;
		validateForm(propsForm, value, field);
	}

	render() {

		const { name, field, propsForm } = this.props;

		return (
			<Form.Field required>
				<label> { name }</label>
				<Form.Input
					className={`add-change-event-${field}`}
					error={!isEmpty(propsForm[field].error)}
					type="text"
					name={field}
					value={propsForm[field].payload}
					placeholder={name}
					icon={!isEmpty(propsForm[field].error) ? 'close' : 'check'}
					onChange={(_event, data) => {
						this.validateForm(data.value, field);
					}}
				/>
				<span className="errors">{ propsForm[field].error }</span>
			</Form.Field>
		);
	}
}

const { validateForm } = actions.form;

function mapStateToProps(state: IReduxState) {
	return {
		propsForm: state.form,
	};
}

export default connect(mapStateToProps, { validateForm })(Input);
