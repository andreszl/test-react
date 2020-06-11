export interface IOptions {
	required?: boolean;
	isEmail?: boolean;
	onlyNumbers?: boolean;
	onlyNumbersWithOrWithoutDecimals?: boolean;
	minLength?: number;
	maxLength?: number;
	onlyLetters?: boolean;
	confirmPassword?: string;
	isAdult?: boolean;
	onlyImages?: boolean;
	onlyVideos?: boolean;
	isExistEmail?: { status: boolean, except?: string };
	isNotExistEmail?: boolean;
	isExistNitRut?: { user_id: string };
	greaterThan?: number;
	isExistCode?: { user_id: string };
	isExistClientId?: { business_id: string, user_id: string, except?: string };
	isNotEqual?: { value: string}
}

export interface IValidateField<Payload = any> {
	name: string,
	alias: string,
	payload: Payload,
	options: IOptions
}

export interface IValidate {
	(
		fields: IValidateField[],
		firstField: string|null
	): Promise<ISuccessValidation[]>;
}

export interface ISuccessValidation {
	field: string,
	type: string,
}

export interface IvalidationError {
	field: string,
	message: string,
	type: string,
}

export class ValidationError {
	public field: string;
	public message: string;
	public type: string;

	constructor(error: IvalidationError) {
		this.field = error.field;
		this.message = error.message;
		this.type = error.type;
	}
}
