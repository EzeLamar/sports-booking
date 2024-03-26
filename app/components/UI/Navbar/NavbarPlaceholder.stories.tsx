import type { Meta, StoryObj } from '@storybook/react';
import NavbarPlaceholder from './NavbarPlaceholder';

const meta = {
	title: 'Page/Navbar/Placeholder',
	component: NavbarPlaceholder,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof NavbarPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
	args: {},
};
