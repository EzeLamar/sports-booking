import type { Meta, StoryObj } from '@storybook/react';
import Signin from './Signin';

const meta = {
	title: 'Login/Signin',
	component: Signin,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Signin>;

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

const handleGoogleLogin = (): void =>
	// eslint-disable-next-line no-alert
	alert('google popup');

export const Enabled: Story = {
	args: {
		handleSubmit,
		handleGoogleLogin,
	},
};
