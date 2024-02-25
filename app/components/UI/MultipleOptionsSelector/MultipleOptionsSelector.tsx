import MultipleOptionBadge from './MultipleOptionBadge';
import './MultipleOptionsSelector.css';

type Props = {
	options: string[];
	selectedOptions: string[];
	setSelectedOptions: (selectedOptions: string[]) => void;
};

export default function MultipleOptionsSelector({
	options,
	selectedOptions,
	setSelectedOptions,
}: Props) {
	const handleSelectOption = (option: string) => {
		const isSelected = selectedOptions.includes(option);
		const newSelectedOptions = isSelected
			? selectedOptions.filter(selected => selected !== option)
			: [...selectedOptions, option];
		setSelectedOptions(newSelectedOptions);
	};

	return (
		<div className='multiple-options-selector__container'>
			{options.map((option, index) => (
				<MultipleOptionBadge
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					label={option}
					selected={selectedOptions.includes(option)}
					select={() => handleSelectOption(option)}
				/>
			))}
		</div>
	);
}
