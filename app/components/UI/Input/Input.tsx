'use client';

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input as InputUI } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export type Props = {
	name: string;
	type: string;
	placeholder: string;
	label: string;
	description?: string;
	showCurrency?: boolean;
	min?: string | undefined;
	max?: string | undefined;
};

export default function Input({
	name,
	type,
	placeholder,
	label,
	description,
	showCurrency,
	min,
	max,
}: Props) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					{showCurrency && <span className='input-group-text'>$</span>}
					<FormControl>
						<InputUI
							onPointerDown={e => e.stopPropagation()}
							type={type}
							placeholder={placeholder}
							{...field}
							min={min}
							max={max}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
