import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { addDays } from 'date-fns';
import DatePicker from './DatePicker';

const meta = {
	title: 'UI/DatePicker',
	component: DatePicker,
	parameters: {},
	tags: ['autodocs'],
	argTypes: { setSelectedDate: { action: 'clicked' } },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const today = new Date();
const dayAfterTomorrow = addDays(today, 2);

export const Default: Story = {
	args: {},
};

export const TestClick: Story = {
	decorators: [
		() => {
			const [selectedDate, setSelectedDate] = useState<Date>(today);
			return (
				<DatePicker
					setSelectedDate={setSelectedDate}
					selectedDate={selectedDate}
				/>
			);
		},
	],
};

export const StartWithADaySelected: Story = {
	args: {
		selectedDate: dayAfterTomorrow,
	},
};

export const HidePastDays: Story = {
	args: {
		hidePastDays: true,
	},
};

export const DisableTheDayAfterTomorrow: Story = {
	args: {
		daysToDisable: [dayAfterTomorrow],
	},
};

export const HidePastDaysAndDisableDayAfterTomorrow: Story = {
	args: {
		hidePastDays: true,
		daysToDisable: [dayAfterTomorrow],
	},
};

export const ShowOnlyOneMonthForward: Story = {
	args: {
		monthsForwardToBeShown: 1,
	},
};

export const ShowOnlyOneMonthBack: Story = {
	args: {
		monthsBackToBeShown: 1,
	},
};
