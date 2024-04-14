/* eslint-disable jsx-a11y/label-has-associated-control */
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import {
	EMAIL_VALIDATOR,
	PASSWORD_VALIDATOR,
} from '../../../utils/Form/inputValidators';
import Card from '../../UI/Card/Card';

export type Login = {
	user: string;
	password: string;
};

type Props = {
	handleSubmit: (data: Login) => Promise<boolean>;
};

const LABELS = {
	TITLE: 'Ingresar',
	USER: 'Usuario',
	USER_PLACEHOLDER: 'example@mail.com',
	PASSWORD: 'Contraseña',
	SUBMIT: 'Ingresar',
};

export default function Signin({ handleSubmit }: Props) {
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
					id='signin-user'
					label={LABELS.USER}
					name='user'
					placeholder={LABELS.USER_PLACEHOLDER}
					{...EMAIL_VALIDATOR}
				/>
				<Input
					id='sigin-pwsd'
					label={LABELS.PASSWORD}
					name='password'
					placeholder={LABELS.PASSWORD}
					{...PASSWORD_VALIDATOR}
				/>
			</Form>
		</Card>
	);
}
