import { RegisterOptions } from 'react-hook-form';

type ValidationType = {
	validation: RegisterOptions;
	type: string;
	showCurrency?: boolean;
};

export const TEXT_VALIDATOR: ValidationType = {
	type: 'text',
	validation: {
		required: {
			value: true,
			message: 'Texto requerido',
		},
		maxLength: {
			value: 30,
			message: 'máximo 30 caracteres',
		},
	},
};

export const HOUR_VALIDATOR: ValidationType = {
	type: 'text',
	validation: {
		required: {
			value: true,
			message: 'Hora requerida',
		},
		pattern: {
			value: /^([0-1]?[0-9]|2[0-3]):[0|3][0]$/,
			message: 'Formato inválido',
		},
	},
};

export const DATETIME_VALIDATOR: ValidationType = {
	type: 'datetime-local',
	validation: {
		required: {
			value: true,
			message: 'Fecha y hora requerida',
		},
		pattern: {
			value: /^\d+-\d+-\d+T([0-1]?[0-9]|2[0-3]):[0|3][0]$/,
			message: 'Formato inválido',
		},
	},
};

export const PASSWORD_VALIDATOR: ValidationType = {
	type: 'password',
	validation: {
		required: {
			value: true,
			message: 'Requerido',
		},
		minLength: {
			value: 6,
			message: 'Mínimo 6 carácteres',
		},
	},
};

export const CHECKBOX_VALIDATOR: ValidationType = {
	type: 'checkbox',
	validation: {
		required: {
			value: true,
			message: 'Elegir al menos una opción',
		},
	},
};

export const RADIO_VALIDATOR: ValidationType = {
	type: 'radio',
	validation: {
		required: {
			value: true,
			message: 'Elegir una opción',
		},
	},
};

export const PRICE_VALIDATOR: ValidationType = {
	showCurrency: true,
	type: 'number',
	validation: {
		required: {
			value: true,
			message: 'Precio requerido',
		},
	},
};

export const NUMBER_VALIDATOR: ValidationType = {
	type: 'number',
	validation: {
		required: {
			value: true,
			message: 'Número requerido',
		},
	},
};

export const EMAIL_VALIDATOR: ValidationType = {
	type: 'email',
	validation: {
		required: {
			value: true,
			message: 'Requerido',
		},
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Email inválido',
		},
	},
};
