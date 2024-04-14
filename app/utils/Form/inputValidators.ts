export const TEXT_VALIDATOR = {
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

export const HOUR_VALIDATOR = {
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

export const DATETIME_VALIDATOR = {
	type: 'datetime-local',
	validation: {
		required: {
			value: true,
			message: 'Fecha requerida',
		},
		pattern: {
			value: /^\d+-\d+-\d+T([0-1]?[0-9]|2[0-3]):[0|3][0]$/,
			message: 'Formato inválido',
		},
	},
};

export const PASSWORD_VALIDATOR = {
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

export const CHECKBOX_VALIDATOR = {
	validation: {
		required: {
			value: true,
			message: 'Elegir al menos una opción',
		},
	},
};

export const RADIO_VALIDATOR = {
	validation: {
		required: {
			value: true,
			message: 'Elegir una opción',
		},
	},
};

export const PRICE_VALIDATOR = {
	showCurrency: true,
	type: 'number',
	validation: {
		required: {
			value: true,
			message: 'Precio requerido',
		},
	},
};

export const NUMBER_VALIDATOR = {
	type: 'number',
	validation: {
		required: {
			value: true,
			message: 'Número requerido',
		},
	},
};

export const EMAIL_VALIDATOR = {
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
