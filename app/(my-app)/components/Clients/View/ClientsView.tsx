import ClientCard from '@/app/(my-app)/components/Clients/ClientCard';
import { Client } from '@/app/(my-app)/firebase/clients/model';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';

type Props = {
	clients: Client[];
};
function ClientsView({ clients }: Props) {
	const [search, setSearch] = useState('');
	const router = useRouter();
	const filteredClients = clients.filter(
		client =>
			client.firstName.toLowerCase().includes(search.toLowerCase()) ||
			client.lastName.toLowerCase().includes(search.toLowerCase()) ||
			client.email?.toLowerCase().includes(search.toLowerCase()) ||
			client.phone?.toLowerCase().includes(search.toLowerCase())
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='flex items-center px-4 space-x-3 pb-3'
			>
				<Input
					type='text'
					placeholder='Buscar cliente...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Button onClick={() => router.push('/clients/new')}>
					<UserPlus />
				</Button>
			</form>
			<div className='flex flex-col md:flex-row md:flex-wrap gap-3 '>
				{filteredClients.length === 0 && (
					<p className='text-xl text-center pt-5 '>No hay resultados..</p>
				)}
				{filteredClients.map(client => (
					<ClientCard key={client.id} client={client} />
				))}
			</div>
		</>
	);
}

export default ClientsView;
