import GoogleButton from 'react-google-button';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import {
	EMAIL_VALIDATOR,
	PASSWORD_VALIDATOR,
} from '../../../utils/Form/inputValidators';
import Card from '../../UI/Card/Card';
import './Signin.css';

export type Login = {
	user: string;
	password: string;
};

type Props = {
	handleSubmit: (data: Login) => Promise<boolean>;
	handleGoogleLogin: () => void;
};

const LABELS = {
	TITLE: 'Ingresar',
	USER: 'Usuario',
	USER_PLACEHOLDER: 'example@mail.com',
	PASSWORD: 'Contraseña',
	SUBMIT: 'Ingresar',
};

export default function Signin({ handleSubmit, handleGoogleLogin }: Props) {
	const formValues = {
		user: null,
		password: null,
	};

	return (
		<Card>
			<legend>{LABELS.TITLE}</legend>
			<div className='signin__google-button'>
				<GoogleButton
					label='Continuar con Google'
					onClick={handleGoogleLogin}
				/>
			</div>
			-ó-
			<Form
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
