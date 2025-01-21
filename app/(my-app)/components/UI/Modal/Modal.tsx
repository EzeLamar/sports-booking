'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type Props = {
	show: boolean;
	title: string;
	onSubmit?: () => void;
	onClose: () => void;
	children: React.ReactNode;
	description?: string | null;
	showFooter?: boolean;
};

export default function Modal({
	show,
	title,
	children,
	onSubmit = () => {},
	onClose,
	description = null,
	showFooter = true,
}: Props) {
	const handleClose = () => {
		onClose();
	};

	const handleSubmit = () => {
		onSubmit();
	};

	return (
		<Dialog open={show} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
				{showFooter && (
					<DialogFooter>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button onClick={handleSubmit}>Save Changes</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
