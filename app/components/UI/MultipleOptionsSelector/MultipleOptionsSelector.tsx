import React, { useEffect, useState } from 'react';
import MultipleOptionBadge from './MultipleOptionBadge';
import './MultipleOptionsSelector.css';

export type Option = {
    label: string,
    selected: boolean,
}

type Props = {
    labels: string[],
    setSelectedLabels: (selectedOptions: string[]) => void,
    defaultState?: boolean,
};

export default function MultipleOptionsSelector({
  labels,
  setSelectedLabels,
  defaultState = false,
}: Props) {
  const [options, setOptions] = useState<Option[]>(labels.map((label) => ({
    label,
    selected: defaultState,
  })));
  const handleOption = (index: number) => {
    const selectedOptions = [...options];
    selectedOptions[index].selected = !selectedOptions[index].selected;
    setOptions(selectedOptions);
  };

  useEffect((): void => {
    setSelectedLabels(
      options.filter(
        (option) => option.selected,
      ).map((optionSelected) => optionSelected.label),
    );
  }, [options, setSelectedLabels]);

  useEffect((): void => {
    setOptions(labels.map((label) => ({
      label,
      selected: defaultState,
    })));
  }, [defaultState, labels]);

  return (
    <div className="multiple-options-selector__container">
      {options.map(
        (option, index) => (
          <MultipleOptionBadge
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={option.label}
            selected={option.selected}
            select={() => handleOption(index)}
          />
        ),
      )}
    </div>
  );
}
