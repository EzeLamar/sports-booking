import { FieldErrors } from 'react-hook-form';

export const isFormInvalid = (err: FieldErrors) => {
	if (Object.keys(err).length > 0) return true;
	return false;
};

export function findInputError(errors: FieldErrors, name: string): FieldErrors {
	const filtered = Object.keys(errors)
		.filter(key => key.includes(name))
		.reduce((cur, key) => Object.assign(cur, { error: errors[key] }), {});

	return filtered;
}
