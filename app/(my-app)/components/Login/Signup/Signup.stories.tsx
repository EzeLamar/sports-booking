import type { Meta, StoryObj } from '@storybook/react';
import SignUp from './Signup';

const meta = {
	title: 'Login/Signup',
	component: SignUp,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SignUp>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleSubmit = (data: unknown): Promise<boolean> =>
	new Promise(resolve => {
		// eslint-disable-next-line no-console
		console.log(data);
		// eslint-disable-next-line no-alert
		alert(JSON.stringify(data));
		resolve(true);
	});

export const Enabled: Story = {
	args: {
		handleSubmit,
	},
};
