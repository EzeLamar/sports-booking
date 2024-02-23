import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RADIO_VALIDATOR } from '../../../utils/Form/inputValidators';
import SingleInputSelector from './SingleInputSelector';
import Form from '../Form/Form';

const meta = {
	title: 'UI/Form/SingleInputSelector',
	component: SingleInputSelector,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SingleInputSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
	'Option 1',
	'Option 2',
	'Option 3',
	'Option 4',
	'Option 5',
	'Option 6',
	'Option 7',
	'Option 8',
];

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
					title='Form With Single Input Selector'
					initialValues={initialValues}
					handleSubmit={handleSubmit}
					handleCancel={() => {}}
					disabled={disabled}
					setDisabled={setDisabled}
				>
					<SingleInputSelector
						id='single-input-selector'
						options={options}
						label='Single input selector field'
						name='options'
						{...RADIO_VALIDATOR}
					/>
				</Form>
			);
		},
	],
};
