import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CHECKBOX_VALIDATOR } from '../../../utils/Form/inputValidators';
import MultipleInputSelector from './MultipleInputSelector';
import Form from '../Form/Form';

const meta = {
	title: 'UI/Form/MultipleInputSelector',
	component: MultipleInputSelector,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof MultipleInputSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

export const FormTest: Story = {
	decorators: [
		() => {
			const initialValues = {
				options: ['Option 2', 'Option 4'],
			};

			const handleSubmit = (data: unknown) => {
				// eslint-disable-next-line no-alert
				alert(JSON.stringify(data));
			};

			const [disabled, setDisabled] = useState<boolean>(true);
			return (
				<Form
					title='Form With Multiple Input Selector'
					initialValues={initialValues}
					handleSubmit={handleSubmit}
					handleCancel={() => {}}
					disabled={disabled}
					setDisabled={setDisabled}
				>
					<MultipleInputSelector
						id='multiple-input-selector'
						options={options}
						label='Options'
						name='options'
						{...CHECKBOX_VALIDATOR}
					/>
				</Form>
			);
		},
	],
};
