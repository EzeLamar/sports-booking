import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

const options = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo',
];

const defaultSelectedOptions = ['martes', 'jueves'];

export const Primary: Story = {
  args: {
    options,
    selectedOptions: defaultSelectedOptions,
    // eslint-disable-next-line no-console
    setSelectedOptions: (selectedLabels) => { console.log(selectedLabels); },
  },
};

export const TryIt: Story = {
  decorators: [
    () => {
      const [selectedLabels, setSelectedLabels] = useState<string[]>(defaultSelectedOptions);

      return (
        <MultipleOptionsSelector
          options={options}
          selectedOptions={selectedLabels}
          setSelectedOptions={setSelectedLabels}
        />
      );
    },
  ],
};
