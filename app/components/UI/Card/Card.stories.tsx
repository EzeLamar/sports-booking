import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
	title: 'UI/Card',
	component: Card,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Test',
	},
};
