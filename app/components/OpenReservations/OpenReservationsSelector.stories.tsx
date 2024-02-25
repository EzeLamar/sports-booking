import type { Meta, StoryObj } from '@storybook/react';
import OpenReservationsSelector from './OpenReservationsSelector';

const meta = {
	title: 'Court/OpenReservationsSelector',
	component: OpenReservationsSelector,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {
		setInitialTime: { action: 'clicked' },
	},
} satisfies Meta<typeof OpenReservationsSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const setInitialTime = () => {};

const allInitialTimes = [
	'9:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
	'21:00',
	'22:00',
	'23:00',
];

export const AllAvailable: Story = {
	args: {
		setInitialTime,
		initialTimes: allInitialTimes,
	},
};

export const SomeAvailables: Story = {
	args: {
		setInitialTime,
		initialTimes: ['9:00', '17:00', '23:00'],
	},
};

export const NoAvailable: Story = {
	args: {
		setInitialTime,
		initialTimes: [],
	},
};
