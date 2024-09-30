'use client';

import Loading from '@/app/components/UI/Loading/Loading';
import { useEffect, useState } from 'react';
import { getClient } from '@/app/firebase/clients/client';
import { Client } from '@/app/firebase/clients/model';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ClientDetails from '@/app/components/Clients/ClientDetails';

export default function ClientDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const courtId = params.id;
	const router = useRouter();
	const [client, setClient] = useState<Client>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const clientsData = await getClient(courtId);

				setClient(clientsData);
				setLoading(false);
			} catch (error: unknown) {
				router.push('/clients');

				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [courtId, router]);

	return loading ? <Loading /> : client && <ClientDetails client={client} />;
}
