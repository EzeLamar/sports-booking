/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
	TEXT_VALIDATOR,
	NUMBER_VALIDATOR,
	EMAIL_VALIDATOR,
	CHECKBOX_VALIDATOR,
} from '../../../utils/Form/inputValidators';
import Form from '../Form/Form';
import Input from './Input';
import MultipleInputSelector from '../MultipleInputSelector/MultipleInputSelector';

const meta = {
	title: 'UI/Form/Input',
	component: Form,
	parameters: {},
	tags: [],
	argTypes: {},
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputsWithValidators: Story = {
	decorators: [
		() => {
			const [disabled, setDisabled] = useState<boolean>(true);
			const initialValues = {
				firstName: 'Pepe',
				lastName: null,
				age: '23',
				email: 'test@mail.com',
				days: ['tuesday'],
			};

			const handleSubmit = (data: unknown) => {
				console.log(data);
				// eslint-disable-next-line no-alert
				alert(JSON.stringify(data));
				setDisabled(true);
			};

			return (
				<Form
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
						label='Firstname'
						id='input-field-firstname'
						placeholder='...'
						name='firstName'
						{...TEXT_VALIDATOR}
					/>
					<Input
						label='Lastname'
						id='input-field-lastname'
						placeholder='...'
						name='lastName'
						{...TEXT_VALIDATOR}
					/>
					<Input
						label='Age'
						id='input-field-age'
						placeholder=''
						name='age'
						{...NUMBER_VALIDATOR}
					/>
					<Input
						label='Email'
						id='input-field-email'
						placeholder='...'
						name='email'
						{...EMAIL_VALIDATOR}
					/>
					<MultipleInputSelector
						id='input-field-multiple-input-selector'
						options={['monday', 'tuesday', 'friday']}
						label='Days'
						name='days'
						{...CHECKBOX_VALIDATOR}
					/>
				</Form>
			);
		},
	],
};
