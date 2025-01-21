import GoogleButton from 'react-google-button';
import { z } from 'zod';
import Card from '@/app/(my-app)/components/UI/Card/Card';
import Form from '@/app/(my-app)/components/UI/Form/Form';
import Input from '@/app/(my-app)/components/UI/Input/Input';

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

const FormSchema = z.object({
	user: z
		.string({
			required_error: 'Dirección de correo requerida',
		})
		.email({
			message: 'Dirección de correo inválida',
		}),
	password: z.string().min(6, {
		message: 'Mínimo 6 carácteres',
	}),
});

export default function Signin({ handleSubmit, handleGoogleLogin }: Props) {
	const initialValues = {
		user: '',
		password: '',
	};

	return (
		<Card>
			<legend>{LABELS.TITLE}</legend>
			<div className='mb-3'>
				<GoogleButton
					label='Continuar con Google'
					onClick={handleGoogleLogin}
				/>
			</div>
			-ó-
			<Form
				disabled={false}
				initialValues={initialValues}
				handleSubmit={handleSubmit}
				submitLabel={LABELS.SUBMIT}
				showCancelButton={false}
				formSchema={FormSchema}
			>
				<Input
					label={LABELS.USER}
					name='user'
					placeholder={LABELS.USER_PLACEHOLDER}
					type='email'
				/>
				<Input
					label={LABELS.PASSWORD}
					type='password'
					name='password'
					placeholder={LABELS.PASSWORD}
				/>
			</Form>
		</Card>
	);
}
