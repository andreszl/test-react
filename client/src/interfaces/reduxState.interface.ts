import { IForm } from './form.interface'; // eslint-disable-line no-unused-vars


export interface IReduxState {
	form: IForm
}

export interface IReduxGetState {
	() : IReduxState;
}
