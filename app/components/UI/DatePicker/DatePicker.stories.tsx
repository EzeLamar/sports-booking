import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { addDays } from 'date-fns';
import DatePicker from '@/app/components/UI/DatePicker/DatePicker';

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
// @ts-expect-error useState ts limitation on storybook
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
		selectedDate: dayAfterTomorrow,
		hidePastDays: true,
	},
};

export const DisableTheDayAfterTomorrow: Story = {
	args: {
		selectedDate: dayAfterTomorrow,
		daysToDisable: [dayAfterTomorrow],
	},
};

export const HidePastDaysAndDisableDayAfterTomorrow: Story = {
	args: {
		selectedDate: dayAfterTomorrow,
		hidePastDays: true,
		daysToDisable: [dayAfterTomorrow],
	},
};

export const ShowOnlyOneMonthForward: Story = {
	args: {
		selectedDate: dayAfterTomorrow,
		monthsForwardToBeShown: 1,
	},
};

export const ShowOnlyOneMonthBack: Story = {
	args: {
		selectedDate: dayAfterTomorrow,
		monthsBackToBeShown: 1,
	},
};
