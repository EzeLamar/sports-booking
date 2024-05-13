import type { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta = {
	title: 'UI/Loading',
	component: Loading,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Show: Story = {
	args: {},
};
