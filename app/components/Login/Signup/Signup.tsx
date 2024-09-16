import Card from '@/app/components/UI/Card/Card';
import { z } from 'zod';
import Input from '@/app/components/UI/Input/Input';
import Form from '@/app/components/UI/Form/Form';

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
				formSchema={FormSchema}
			>
				<Input
					label={LABELS.USER}
					name='user'
					type='email'
					placeholder={LABELS.USER_PLACEHOLDER}
				/>
				<Input
					label={LABELS.PASSWORD}
					name='password'
					type='password'
					placeholder={LABELS.PASSWORD}
				/>
			</Form>
		</Card>
	);
}
