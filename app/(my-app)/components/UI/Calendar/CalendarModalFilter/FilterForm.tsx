/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { z } from 'zod';
import {
	ReservationStatus,
	ReservationType,
} from '@/app/(my-app)/firebase/reservations/model';
import Select from '@/app/(my-app)/components/UI/Select/Select';
import { ClientsContext } from '@/app/(my-app)/context/ClientsContext';
import ComboBox from '@/app/(my-app)/components/UI/Input/ComboBox';
import {
	STATUS_VALUES,
	TYPE_VALUES,
} from '@/app/(my-app)/components/Reservations/ReservationForm';
import { Filters } from '@/app/(my-app)/hooks/useReservations';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LABELS = {
	OWNER: 'Titular',
	TYPE: 'Tipo',
	STATUS: 'Estado',
	FILTER: 'Filtrar',
};

type Props = {
	filters: Filters;
	setFilters: (filters: Filters) => void;
};

const FormSchema = z.object({
	owner: z
		.string()
		.min(2, {
			message: 'El nombre de la reserva debe tener al menos 2 caracteres.',
		})
		.nullable(),
	type: z.nativeEnum(ReservationType).nullable(),
	status: z.nativeEnum(ReservationStatus).nullable(),
});
export default function FilterForm({ filters, setFilters }: Props) {
	const clients = useContext(ClientsContext);
	const router = useRouter();

	const initialValues = {
		owner: filters.clientIds.length ? filters.clientIds[0] : null,
		type: filters.types.length ? filters.types[0] : null,
		status: filters.status.length ? filters.status[0] : null,
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: initialValues,
	});

	const onSubmit = async (
		data: z.infer<typeof FormSchema>
	): Promise<boolean> => {
		const clientIds = data.owner ? [data.owner] : [];
		const types = data.type ? [data.type] : [];
		const status = data.status ? [data.status] : [];
		setFilters({
			clientIds,
			types,
			status,
		});
		return new Promise(resolve => {
			resolve(true);
		});
	};

	const clientsByName = clients.map(client => ({
		label: `${client.firstName} ${client.lastName}`,
		value: client.id,
	}));

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-3'
			>
				<ComboBox
					name='owner'
					options={clientsByName}
					label={LABELS.OWNER}
					searchable
					handleSearchNotFound={() => router.push('/clients')}
				/>
				<Select name='type' label={LABELS.TYPE} options={TYPE_VALUES} />
				<Select name='status' label={LABELS.STATUS} options={STATUS_VALUES} />
				<DialogClose asChild>
					<Button className='w-full' type='submit'>
						Filtrar
					</Button>
				</DialogClose>
			</form>
		</Form>
	);
}
