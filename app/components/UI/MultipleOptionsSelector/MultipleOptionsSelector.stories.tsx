import type { Meta, StoryObj } from '@storybook/react';
import MultipleOptionsSelector from './MultipleOptionsSelector';

const meta = {
  title: 'UI/MultipleOptionsSelector',
  component: MultipleOptionsSelector,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},

} satisfies Meta<typeof MultipleOptionsSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const labels = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo',
];

export const Enabled: Story = {
  args: {
    labels,
    defaultState: true,
    // eslint-disable-next-line no-console
    setSelectedLabels: (selectedLabels) => { console.log(selectedLabels); },
  },
};

export const Disabled: Story = {
  args: {
    labels,
    // eslint-disable-next-line no-console
    setSelectedLabels: (selectedLabels) => { console.log(selectedLabels); },
  },
};
