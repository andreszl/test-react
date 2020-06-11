import constants from '../constants';
import { initialStateForm, IForm } from '../interfaces/form.interface'; // eslint-disable-line no-unused-vars

const form = (state: IForm = initialStateForm, action: {
	type: string,
	form: IForm,
}) => {

	switch (action.type) {
		case constants.form.UPDATE_FORM:

			delete action.form.complete;

			return {
				...state,
				...action.form,
			};

		case constants.form.COMPLETED:
			return {
				...state,
				complete: true,
			};

		case constants.form.INCOMPLETED:
			return {
				...state,
				complete: false,
			};

		case constants.form.RESET:
			return {
				value: { payload: '', error: '' },
				trm: { payload: '', error: '' },
				select: { payload: { text: '', value: '' }, error: '' },
				description: { payload: '', error: '' },
				reset: true,
				complete: false,
			};

		default:
			return state;
	}
};

export default form;
