import type { Meta, StoryObj } from '@storybook/react';
import CourtSettings, { Court } from './CourtSettings';

const meta = {
	title: 'Courts/CourtSettings',
	component: CourtSettings,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CourtSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

const court: Court = {
	isEnabled: true,
	name: 'Test Court',
	address: 'Test Address 1234',
	availableDays: ['Martes', 'Jueves', 'Domingo'],
	pricePerHour: '1234',
	openHour: '14:00',
	closeHour: '16:00',
};

const handleSubmit = (data: unknown) => {
	// eslint-disable-next-line no-console
	console.log(data);
	// eslint-disable-next-line no-alert
	alert(JSON.stringify(data));
};
const handleCancel = () => {
	// eslint-disable-next-line no-console
	console.log('Cancel Button');
};

export const Enabled: Story = {
	args: {
		court,
		editable: true,
		handleSubmit,
		handleCancel,
	},
};

export const Disabled: Story = {
	args: {
		court,
		handleSubmit,
		handleCancel,
	},
};

export const Empty: Story = {
	args: {
		editable: true,
		handleSubmit,
		handleCancel,
	},
};
