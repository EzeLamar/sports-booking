export const TEXT_VALIDATOR = {
	type: 'text',
	validation: {
		required: {
			value: true,
			message: 'texto requerido',
		},
		maxLength: {
			value: 30,
			message: 'máximo 30 caracteres',
		},
	},
};

export const HOUR_VALIDATOR = {
	type: 'text',
	validation: {
		required: {
			value: true,
			message: 'hora requerida',
		},
		pattern: {
			value: /^([0-1]?[0-9]|2[0-3]):[0][0]$/,
			message: 'formato no válido',
		},
	},
};

export const PASSWORD_VALIDATOR = {
	type: 'password',
	validation: {
		required: {
			value: true,
			message: 'requerido',
		},
		minLength: {
			value: 6,
			message: 'al menos 6 carácteres',
		},
	},
};

export const CHECKBOX_VALIDATOR = {
	validation: {
		required: {
			value: true,
			message: 'al menos 1 requerido',
		},
	},
};

export const RADIO_VALIDATOR = {
	validation: {
		required: {
			value: true,
			message: 'elegir una opción',
		},
	},
};

export const PRICE_VALIDATOR = {
	showCurrency: true,
	type: 'number',
	validation: {
		required: {
			value: true,
			message: 'precio requerido',
		},
	},
};

export const NUMBER_VALIDATOR = {
	type: 'number',
	validation: {
		required: {
			value: true,
			message: 'número requerido',
		},
	},
};

export const EMAIL_VALIDATOR = {
	type: 'email',
	validation: {
		required: {
			value: true,
			message: 'requerido',
		},
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'email no válido',
		},
	},
};
