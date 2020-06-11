import _ from 'lodash';
import { Dispatch } from 'redux'; // eslint-disable-line no-unused-vars
import constants from '../constants';
import { validate } from '../utils/validate.util';
import { IValidateFormAction, IForm } from '../interfaces/form.interface'; // eslint-disable-line no-unused-vars
import { ValidationError } from '../interfaces/validations.interfaces';

export function updateForm(form: IForm) {
	return {
		type: constants.form.UPDATE_FORM,
		form,
	};
}

export function completed() {
	return {
		type: constants.form.COMPLETED,
	};
}
export function incomplete() {
	return {
		type: constants.form.INCOMPLETED,
	};
}

export function resetForm() {
	return {
		type: constants.form.RESET,
	};
}


export const validateForm: IValidateFormAction = (
	form, value = null, field = null,
) => async (dispatch: Dispatch) => {
	try {

		_.update(form, `${field}.payload`, () => {
			_.update(form, `${field}.error`, () => { return ''; });
			return value;
		});

		console.log(form.select);

		await validate([
			{ name: 'value', alias: 'valor', payload: form.value.payload, options: { required: true } },
			{ name: 'trm', alias: 'TRM', payload: form.trm.payload, options: { required: true } },
			{ name: 'select', alias: 'select', payload: form.select.payload.text, options: { required: true } },
			{ name: 'description', alias: 'descripción', payload: form.description.payload, options: { required: true, minLength: 7, maxLength: 300 } },
		], field);

		dispatch(completed());
	} catch (err) {
		if (err instanceof ValidationError) {
			_.update(form, `${err.field}.error`, () => { return err.message; }); dispatch(incomplete());
		}
	} finally {
		dispatch(updateForm(form));
	}
};
