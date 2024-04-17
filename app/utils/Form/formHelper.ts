import { FieldErrors } from 'react-hook-form';

export function findInputError(
	errors: FieldErrors,
	name: string
): string | null {
	let errorMessage = null;
	Object.keys(errors)
		.filter(key => key.includes(name))
		.reduce((cur, key) => {
			errorMessage = errors[key]?.message;
			return Object.assign(cur, { error: errors[key] });
		}, {});

	return errorMessage;
}
