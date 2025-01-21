'use client';

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select as SelectUI,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';

export type Props = {
	name: string;
	label: string;
	options: { value: string; label: string }[];
	description?: string;
};

export default function Select({ name, label, options, description }: Props) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<SelectUI
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
							</FormControl>
							<SelectContent
								ref={ref =>
									// temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
									ref?.addEventListener('touchend', e => e.preventDefault())
								}
							>
								{options.map(option => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</SelectUI>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
