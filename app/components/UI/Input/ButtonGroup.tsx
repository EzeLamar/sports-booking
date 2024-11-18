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
import { cn } from '@/lib/utils';
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
					<div className='flex gap-2'>
						{items.map(item => (
							<FormField
								key={item.id}
								control={control}
								name={name}
								render={({ field }) => (
									<FormItem key={item.id}>
										<FormControl>
											<Checkbox
												hidden
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
										<FormLabel
											className={cn(
												'w-8 h-8 rounded-full border inline-flex items-center justify-center text-sm font-bold hover:border-primary',
												field.value?.includes(item.id) &&
													'bg-primary text-primary-foreground border-primary'
											)}
										>
											{item.label}
										</FormLabel>
									</FormItem>
								)}
							/>
						))}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
