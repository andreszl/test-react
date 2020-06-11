export interface IForm {
	value: { payload: string, error: string},
	trm: { payload: string, error: string},
	select: { payload: { text: string, value: string }, error: string},
	description: { payload: string, error: string},
	complete: boolean;
}

export const initialStateForm: IForm = {
	value: { payload: '', error: '' },
	trm: { payload: '', error: '' },
	select: { payload: { text: '', value: '' }, error: '' },
	description: { payload: '', error: '' },
	complete: false,
};

export interface IValidateFormAction {
	(form: IForm, value: string|null, firstField: string|null): void
}

export interface IStoreForm {
	value: string,
	trm: string,
	select: { text: string, value: string },
	description: string,
}

export interface IResetForm {
	(): void
}
