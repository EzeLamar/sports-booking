'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import { Form as FormUI } from '@/components/ui/form';
import { Pencil, Loader2 } from 'lucide-react';
import { useState } from 'react';

const LABELS = {
	SUBMIT: 'Guardar',
	CANCEL: 'Cancelar',
};

type Props = {
	children: React.ReactNode;
	formSchema: ZodType;
	initialValues: object;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	handleSubmit: (data: any) => Promise<boolean>;
	title?: string | null;
	showCancelButton?: boolean;
	submitLabel?: string;
	disabled?: boolean;
	handleCancel?: () => void;
	setDisabled?: (state: boolean) => void;
};

export default function Form({
	children,
	formSchema,
	initialValues,
	handleSubmit,
	title = null,
	submitLabel = LABELS.SUBMIT,
	showCancelButton = true,
	disabled = false,
	handleCancel = () => {},
	setDisabled = () => {},
}: Props) {
	const [submitting, setSubmitting] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialValues,
		disabled,
	});
	const onCancel = () => {
		form.reset();
		setDisabled(true);
		handleCancel();
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		setSubmitting(true);
		handleSubmit(values)
			.then(() => setDisabled(true))
			.catch(() => onCancel())
			.finally(() => setSubmitting(false));
	};

	return (
		<FormUI {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='sm:w-2/3 space-y-6'
				noValidate
			>
				<legend className='flex gap-3 justify-between text-xl'>
					{title}
					{form.formState.disabled && (
						<Button
							type='button'
							variant='outline'
							onClick={() => setDisabled(false)}
						>
							<Pencil className='h-4 w-4' />
						</Button>
					)}
				</legend>
				{/* <ScrollArea className='h-100 w-full'> */}
				{children}
				{/* </ScrollArea> */}
				{!form.formState.disabled && (
					<div className='flex justify-end gap-3 pt-3'>
						{showCancelButton && (
							<Button type='button' variant='secondary' onClick={onCancel}>
								{LABELS.CANCEL}
							</Button>
						)}
						<Button disabled={submitting} type='submit'>
							{submitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							{submitLabel}
						</Button>
					</div>
				)}
			</form>
		</FormUI>
	);
}
