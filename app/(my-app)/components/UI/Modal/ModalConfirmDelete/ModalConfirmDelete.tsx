'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type Props = {
	handleDelete: () => void;
	children: React.ReactNode;
	title: string;
	description?: string;
};

export default function ModalConfirmDelete({
	handleDelete,
	children,
	title,
	description,
}: Props) {
	return (
		<Dialog>
			{children}
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>{`Borrar ${title}`}</DialogTitle>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<p>Esta acción no tiene vuelta atrás.</p>
						{description && <p>{description}</p>}
					</div>
				</div>
				<DialogFooter className='flex gap-3'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Cancelar
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type='button' variant='destructive' onClick={handleDelete}>
							Borrar
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
