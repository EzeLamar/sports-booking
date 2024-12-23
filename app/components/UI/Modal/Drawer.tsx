'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
	Drawer as DrawerUI,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from '@/components/ui/drawer';

type Props = {
	show: boolean;
	setShow: (state: boolean) => void;
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
	title?: string | null;
	showFooter?: boolean;
	description?: string | null;
};

export default function Drawer({
	show,
	setShow,
	children,
	onClose,
	className = '',
	title = null,
	showFooter = false,
	description = null,
}: Props) {
	const formContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleResize = () => {
			if (formContainerRef.current) {
				formContainerRef.current.style.setProperty(
					'bottom',
					`env(safe-area-inset-bottom)`
				);
			}
		};

		if (window.visualViewport) {
			window.visualViewport.addEventListener('resize', handleResize);
			handleResize(); // Initial call in case the keyboard is already open
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener('resize', handleResize);
			}
		};
	}, []);

	return (
		<DrawerUI open={show} onClose={onClose} onOpenChange={setShow}>
			<DrawerContent
				ref={formContainerRef}
				className={`px-3 pb-3 ${className}`}
			>
				<DrawerHeader className='flex flex-col'>
					{title && <DrawerTitle>{title}</DrawerTitle>}
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>
				{children}
				{showFooter && (
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant='outline' onClick={onClose}>
								Cancelar
							</Button>
						</DrawerClose>
					</DrawerFooter>
				)}
			</DrawerContent>
		</DrawerUI>
	);
}
