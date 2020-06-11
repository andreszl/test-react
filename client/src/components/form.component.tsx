import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as S from 'semantic-ui-react';
import _, { isEmpty } from 'lodash';
import '../stylesheet/form.less';
import { IReduxState } from '../interfaces/reduxState.interface'; // eslint-disable-line no-unused-vars
import { IForm, IResetForm, IValidateFormAction } from '../interfaces/form.interface'; // eslint-disable-line no-unused-vars

import Input from './input.component';
import actions from '../actions';
import api from '../api';

interface Props {
	propsForm: IForm;
	resetForm: IResetForm;
	validateForm: IValidateFormAction;
}

interface State {
	options: { value: number, text: string }[];
	records: {
		_id: number,
		value: string,
		trm: string,
		select: { text: string, value: string },
		description: string,
	}[];
}

class Form extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			options: [
				{
					value: 1,
					text: 'item 1',
				},
				{
					value: 2,
					text: 'item 2',
				},
				{
					value: 3,
					text: 'item 3',
				},
			],
			records: [],
		};

		this.onChangeSelect = this.onChangeSelect.bind(this);
		this.onChangeTextArea = this.onChangeTextArea.bind(this);
	}

	componentDidMount() {
		const records = JSON.parse((localStorage.getItem('records') as string));

		if (records) {
			this.setState({ records });
		}

	}

	onChangeSelect(_event: React.SyntheticEvent<HTMLElement, Event>, select: S.DropdownProps) {
		const { options } = this.state;

		const value = _.find(options, { value: (select.value) as number });

		this.validateForm(value, 'select');
	}

	onChangeTextArea(_event: React.FormEvent<HTMLTextAreaElement>, data: S.TextAreaProps) {
		if (data.value) {
			this.validateForm(data.value, 'description');
		}
	}

	setNewRecord(record: State['records'][0]) {
		const { records } = this.state;

		records.push(record);

		this.setState({ records });
	}

	async save() {
		const { propsForm } = this.props;

		const data = await api.form.save();

		console.log(data);

		let records = JSON.parse(localStorage.getItem('records') as string) as State['records'];

		const record = {
			_id: 1,
			value: propsForm.value.payload,
			trm: propsForm.trm.payload,
			select: propsForm.select.payload,
			description: propsForm.description.payload,
		};

		if (records) {

			record._id = records.length + 1;
			records.push(record);
		} else {
			records = [record];
		}

		localStorage.setItem('records', JSON.stringify(records));
		this.setNewRecord(record);
	}


	validateForm(value: any, field: string|null = null) {
		const { validateForm, propsForm } = this.props;
		validateForm(propsForm, value, field);
	}

	render() {
		const { propsForm, resetForm } = this.props;
		const { options, records } = this.state;

		return (
			<div className="custom-form">
				<S.Container>
					<div className="box">
						<h2 className="create-business-title">Formulario</h2>
						<S.Form className="business-form">
							<S.Form.Group widths="equal">
								<Input name="Valor" field="value" />

								<Input name="TRM" field="trm" />

							</S.Form.Group>
							<S.Form.Group widths="equal">
								<S.Form.Field>
									<S.Form.Dropdown
										required
										fluid
										label="Select"
										search
										selection
										error={!isEmpty(propsForm.select.error)}
										options={options}
										placeholder="Select"
										defaultValue={propsForm.select.payload.text}
										onChange={this.onChangeSelect}
									/>
									<span className="errors">{propsForm.select.error}</span>
								</S.Form.Field>
							</S.Form.Group>
							<S.Form.Field required>
								<label>Descripción</label>
								<S.Form.TextArea
									error={!isEmpty(propsForm.description.error)}
									name="description"
									placeholder="Descripción"
									onChange={this.onChangeTextArea}
									value={propsForm.description.payload}
								/>
								<span className="errors">{propsForm.description.error}</span>
							</S.Form.Field>
						</S.Form>
					</div>
					<div className="business-actions">
						<S.Button onClick={() => resetForm()} secondary>Reiniciar Formulario</S.Button>
						<S.Button
							disabled={!propsForm.complete}
							onClick={() => this.save()}
						>
							Guardar
						</S.Button>
					</div>

					<S.Table celled>
						<S.Table.Header>
							<S.Table.Row>
								<S.Table.HeaderCell>Id</S.Table.HeaderCell>
								<S.Table.HeaderCell>Valor</S.Table.HeaderCell>
								<S.Table.HeaderCell>TRM</S.Table.HeaderCell>
								<S.Table.HeaderCell>Select</S.Table.HeaderCell>
								<S.Table.HeaderCell>Descripción</S.Table.HeaderCell>
							</S.Table.Row>
						</S.Table.Header>

						<S.Table.Body>
							{
								records.map((record, index) => {
									const key = `${record._id} ${index}`;
									return (
										<S.Table.Row key={key}>
											<S.Table.Cell>{ record._id }</S.Table.Cell>
											<S.Table.Cell>{ record.value }</S.Table.Cell>
											<S.Table.Cell>{ record.trm }</S.Table.Cell>
											<S.Table.Cell>{ record.select.text }</S.Table.Cell>
											<S.Table.Cell>{ record.description }</S.Table.Cell>
										</S.Table.Row>

									);
								})
							}
						</S.Table.Body>
					</S.Table>
				</S.Container>
				<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
			</div>
		);
	}
}

const { resetForm, validateForm } = actions.form;

function mapStateToProps(state: IReduxState) {
	return {
		propsForm: state.form,
	};
}


export default connect(mapStateToProps, { resetForm, validateForm })(Form);
