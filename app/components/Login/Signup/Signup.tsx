/* eslint-disable jsx-a11y/label-has-associated-control */
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import {
	EMAIL_VALIDATOR,
	PASSWORD_VALIDATOR,
} from '../../../utils/Form/inputValidators';
import Card from '../../UI/Card/Card';

export type Register = {
	user: string;
	password: string;
};

type Props = {
	handleSubmit: (data: Register) => Promise<boolean>;
};

const LABELS = {
	TITLE: 'Registrar',
	USER: 'Usuario',
	USER_PLACEHOLDER: 'example@mail.com',
	PASSWORD: 'Contraseña',
	SUBMIT: 'Registrar',
};

export default function Signup({ handleSubmit }: Props) {
	const formValues = {
		user: null,
		password: null,
	};

	return (
		<Card>
			<Form
				title={LABELS.TITLE}
				disabled={false}
				initialValues={formValues}
				handleSubmit={handleSubmit}
				submitLabel={LABELS.SUBMIT}
				showCancelButton={false}
			>
				<Input
					id='signup-user'
					label={LABELS.USER}
					name='user'
					placeholder={LABELS.USER_PLACEHOLDER}
					{...EMAIL_VALIDATOR}
				/>
				<Input
					id='sigup-pwsd'
					label={LABELS.PASSWORD}
					name='password'
					placeholder={LABELS.PASSWORD}
					{...PASSWORD_VALIDATOR}
				/>
			</Form>
		</Card>
	);
}
