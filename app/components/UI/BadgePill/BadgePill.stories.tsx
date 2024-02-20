import type { Meta, StoryObj } from '@storybook/react';
import BadgePill from './BadgePill';

const meta = {
  title: 'UI/BadgePill',
  component: BadgePill,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},

} satisfies Meta<typeof BadgePill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Test',
  },
};
