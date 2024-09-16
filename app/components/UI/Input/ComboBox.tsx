'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

export type Props = {
	name: string;
	options: { value: string; label: string }[];
	label: string;
	description?: string;
	searchable?: boolean;
};

export default function ComboBox({
	name,
	options,
	label,
	description,
	searchable = false,
}: Props) {
	const { control, setValue } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									className={cn(
										'w-[200px] justify-between',
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value
										? options.find(option => option.value === field.value)
												?.label
										: `Eliga ${label}`}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='w-[200px] p-0'>
							<Command>
								{searchable && <CommandInput placeholder='Buscar...' />}
								<CommandList>
									<CommandEmpty>No se encontraron resultados.</CommandEmpty>
									<CommandGroup>
										{options.map(option => (
											<CommandItem
												value={option.label}
												key={option.value}
												onSelect={() => {
													setValue(name, option.value);
												}}
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														option.value === field.value
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
												{option.label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
