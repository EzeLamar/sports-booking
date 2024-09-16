/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { z } from 'zod';
import Form from '../Form/Form';
import Input from './Input';
import ButtonGroup from './ButtonGroup';

const meta = {
	title: 'UI/Form/Input',
	component: Form,
	parameters: {},
	tags: [],
	argTypes: {},
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormSchema = z.object({
	firstName: z.string().min(4, { message: 'Al menos 4 caracteres' }),
	lastName: z.string().min(4, { message: 'Al menos 4 caracteres' }),
	age: z.coerce.number({
		required_error: 'Edad requerida',
	}),
	email: z
		.string({
			required_error: 'Email requerido',
		})
		.email({ message: 'Email no es valido' }),
	days: z.array(z.string()),
});

const daysOptions = [
	{ id: 'monday', label: 'Monday' },
	{ id: 'tuesday', label: 'Tuesday' },
	{ id: 'wednesday', label: 'Wednesday' },
	{ id: 'thursday', label: 'Thursday' },
];

// @ts-expect-error useState ts limitation on storybook
export const InputsWithValidators: Story = {
	decorators: [
		() => {
			const [disabled, setDisabled] = useState<boolean>(true);
			const initialValues = {
				firstName: 'Pepe',
				lastName: '',
				age: 23,
				email: 'test@mail.com',
				days: ['tuesday'],
			};

			const handleSubmit = (data: unknown): Promise<boolean> =>
				new Promise(resolve => {
					console.log(data);
					// eslint-disable-next-line no-alert
					alert(JSON.stringify(data));
					resolve(true);
				});

			return (
				<Form
					formSchema={FormSchema}
					title='Form With Inputs'
					initialValues={initialValues}
					handleSubmit={handleSubmit}
					handleCancel={() => {
						console.log('Cancel');
					}}
					disabled={disabled}
					setDisabled={setDisabled}
				>
					<Input
						type='text'
						label='Firstname'
						placeholder='...'
						name='firstName'
					/>
					<Input
						type='text'
						label='Lastname'
						placeholder='...'
						name='lastName'
					/>
					<Input type='number' label='Age' placeholder='Age' name='age' />
					<Input type='email' label='Email' placeholder='...' name='email' />
					<ButtonGroup items={daysOptions} label='Days' name='days' />
				</Form>
			);
		},
	],
};
