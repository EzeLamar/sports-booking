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
	id: 'MockID',
	isEnabled: true,
	name: 'Test Court',
	address: 'Test Address 1234',
	availableDays: ['Martes', 'Jueves', 'Domingo'],
	matchPerHour: 1234.5,
	classPerHour: 456.5,
	tournamentPerHour: 8000.5,
	openHour: '14:00',
	closeHour: '16:00',
};

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
		court,
		editable: true,
		handleSubmit,
	},
};

export const Disabled: Story = {
	args: {
		court,
		handleSubmit,
	},
};

export const Empty: Story = {
	args: {
		editable: true,
		handleSubmit,
	},
};
