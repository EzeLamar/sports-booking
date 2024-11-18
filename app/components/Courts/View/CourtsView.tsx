import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MapPinPlus } from 'lucide-react';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import CourtCard from '@/app/components/Courts/CourtCard';

type Props = {
	courts: Court[];
};
function CourtsView({ courts }: Props) {
	const [search, setSearch] = useState('');
	const router = useRouter();
	const filteredcourts = courts.filter(
		court =>
			court.name.toLowerCase().includes(search.toLowerCase()) ||
			court.address.toLowerCase().includes(search.toLowerCase())
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
					placeholder='Buscar Cancha...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Button onClick={() => router.push('/courts/new')}>
					<MapPinPlus />
				</Button>
			</form>
			<div className='flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3'>
				{filteredcourts.length === 0 && (
					<p className='text-xl text-center pt-5 '>No hay resultados..</p>
				)}
				{filteredcourts.map(court => (
					<CourtCard key={court.id} court={court} />
				))}
			</div>
		</>
	);
}

export default CourtsView;
