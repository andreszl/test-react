import _, { isEmpty } from 'lodash';
import { VALID_EMAIL, ONLY_LETTERS, ONLY_NUMBERS, ONLY_NUMBERS_WITH_OR_WITHOUT_DECIMALS } from '../utils/regex.util';
import { IValidate, IValidateField, IvalidationError, ValidationError, ISuccessValidation } from '../interfaces/validations.interfaces'; // eslint-disable-line no-unused-vars

function required(field: IValidateField) {
	if (field.options.required) {
		if (isEmpty(field.payload)) {
			const error: IvalidationError = {
				field: field.name,
				message: `El ${field.alias} es requerido*`,
				type: 'required',
			};

			throw new ValidationError(error);
		}
	}

}

function isEmail(field: IValidateField) {
	if (field.options.isEmail) {
		if (field.payload.search(new RegExp(VALID_EMAIL))) {
			const error: IvalidationError = {
				field: field.name,
				message: `El ${field.alias} es invalido*`,
				type: 'isEmail',
			};

			throw new ValidationError(error);
		}
	}
}


function minLength(field: IValidateField) {
	if (field.options.minLength && field.payload.length < field.options.minLength) {

		const error: IvalidationError = {
			field: field.name,
			message: `El campo ${field.alias} debe tener un minimo de ${field.options.minLength} caracteres*`,
			type: 'minLength',
		};

		throw new ValidationError(error);
	}
}

function maxLength(field: IValidateField) {
	if (field.options.maxLength && field.payload.length > field.options.maxLength) {

		const error: IvalidationError = {
			field: field.name,
			message: `El campo ${field.alias} debe tener un máximo de ${field.options.maxLength} caracteres*`,
			type: 'maxLength',
		};

		throw new ValidationError(error);
	}
}

function onlyLetters(field: IValidateField) {
	if (field.options.onlyLetters) {
		if (field.payload.search(ONLY_LETTERS)) {

			const error: IvalidationError = {
				field: field.name,
				message: `El campo ${field.alias} solo acepta letras*`,
				type: 'onlyLetters',
			};

			throw new ValidationError(error);
		}
	}
}

function onlyNumbers(field: IValidateField) {
	if (field.options.onlyNumbers) {
		if (field.payload.search(ONLY_NUMBERS)) {
			const error: IvalidationError = {
				field: field.name,
				message: `El campo ${field.alias} solo acepta numeros*`,
				type: 'onlyNumbers',
			};

			throw new ValidationError(error);
		}
	}
}

function onlyNumbersWithOrWithoutDecimals(field: IValidateField) {
	if (field.options.onlyNumbersWithOrWithoutDecimals) {
		if (field.payload.search(ONLY_NUMBERS_WITH_OR_WITHOUT_DECIMALS)) {
			const error: IvalidationError = {
				field: field.name,
				message: `El campo ${field.alias} solo acepta numeros con decimales*`,
				type: 'onlyNumbersWithOrWithoutDecimals',
			};

			throw new ValidationError(error);
		}
	}
}

function greaterThan(field: IValidateField) {
	if (
		field.options.greaterThan !== undefined
		&& field.options.greaterThan >= (Number)(field.payload)
	) {
		const error: IvalidationError = {
			field: field.name,
			message: `El campo ${field.alias} debe terner un valor superior a ${field.options.greaterThan} pesos*`,
			type: 'greaterThan',
		};

		throw new ValidationError(error);
	}
}

function confirmPassword(field: IValidateField) {
	if (field.options.confirmPassword !== field.payload) {
		const error: IvalidationError = {
			field: field.name,
			message: 'Las contraseñas no coinciden*',
			type: 'confirmPassword',
		};

		throw new ValidationError(error);
	}
}

function onlyImages(field: IValidateField) {
	const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

	if (field.options.onlyImages) {
		Array.from(field.payload).map((file: any) => {
			if (isEmpty(validTypes.find((type) => type === file.type))) {

				const error: IvalidationError = {
					field: field.name,
					message: 'Solo se aceptan imagenes*',
					type: 'onlyImages',
				};

				throw new ValidationError(error);
			}
		});
	}
}

function onlyVideos(field: IValidateField) {
	const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
	if (field.options.onlyVideos) {
		Array.from(field.payload).map((file: any) => {
			if (isEmpty(validTypes.find((type) => type === file.type))) {

				const error: IvalidationError = {
					field: field.name,
					message: 'Solo se aceptan videos*',
					type: 'onlyVideos',
				};

				throw new ValidationError(error);
			}
		});
	}
}

function isAdult(field: IValidateField) {
	if (field.options.isAdult) {
		const today = new Date();
		const birthDate = field.payload;
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age -= 1;
		}
		if (age < 18) {
			const error: IvalidationError = {
				field: field.name,
				message: 'Debes que se mayor de edad*',
				type: 'isAdult',
			};

			throw new ValidationError(error);
		}
	}
}
function isNotEqual(field: IValidateField) {
	if (field.options.isNotEqual && field.options.isNotEqual.value) {
		if (field.payload === field.options.isNotEqual.value) {
			const error: IvalidationError = {
				field: field.name,
				message: `El campo ${field.alias} debe ser diferente a la contraseña actual*`,
				type: 'isNotEqual',
			};

			throw new ValidationError(error);
		}
	}

}


export const validate: IValidate = async (fields, firstField) => {
	let count = 0;

	let sortedFields: IValidateField[] = [];
	const successValidations: ISuccessValidation[] = [];

	if (firstField != null) {
		sortedFields = _.sortBy(fields, (field) => {
			return field.name === firstField ? 0 : 1;
		});
	} else {
		sortedFields = fields;
	}

	do {
		let optionCount = 0;
		const options: string[] = Object.getOwnPropertyNames(sortedFields[count].options);

		do {

			switch (options[optionCount]) {
				case 'required': required(sortedFields[count]); break;
				case 'isEmail': isEmail(sortedFields[count]); break;
				case 'onlyNumbers': onlyNumbers(sortedFields[count]); break;
				case 'minLength': minLength(sortedFields[count]); break;
				case 'maxLength': maxLength(sortedFields[count]); break;
				case 'onlyLetters': onlyLetters(sortedFields[count]); break;
				case 'confirmPassword': confirmPassword(sortedFields[count]); break;
				case 'isAdult': isAdult(sortedFields[count]); break;
				case 'onlyImages': onlyImages(sortedFields[count]); break;
				case 'onlyVideos': onlyVideos(sortedFields[count]); break;
				case 'onlyNumbersWithOrWithoutDecimals': onlyNumbersWithOrWithoutDecimals(sortedFields[count]); break;
				case 'greaterThan': greaterThan(sortedFields[count]); break;
				case 'isNotEqual': isNotEqual(sortedFields[count]); break;
				default: null;
			}

			successValidations.push({
				field: sortedFields[count].name,
				type: options[optionCount],
			});

			optionCount++;

		} while (optionCount < options.length);

		count++;
	} while (count < fields.length);

	return successValidations;
};
