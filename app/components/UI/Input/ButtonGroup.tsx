'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

export type Props = {
	name: string;
	label: string;
	items: { id: string; label: string }[];
	description?: string;
};

export default function ButtonGroup({
	name,
	label,
	items,
	description,
}: Props) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem>
					<div className='mb-4'>
						<FormLabel className='text-base'>{label}</FormLabel>
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					{items.map(item => (
						<FormField
							key={item.id}
							control={control}
							name={name}
							render={({ field }) => (
								<FormItem
									key={item.id}
									className='flex flex-row items-start space-x-3 space-y-0'
								>
									<FormControl>
										<Checkbox
											checked={field.value?.includes(item.id)}
											onCheckedChange={checked =>
												checked
													? field.onChange([...field.value, item.id])
													: field.onChange(
															field.value?.filter(
																(value: string) => value !== item.id
															)
														)
											}
											{...field}
										/>
									</FormControl>
									<FormLabel className='font-normal'>{item.label}</FormLabel>
								</FormItem>
							)}
						/>
					))}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
