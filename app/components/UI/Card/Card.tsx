'use client';

import { CardContent, Card as CardUI } from '@/components/ui/card';

type Props = {
	children: React.ReactNode;
};

export default function Card2({ children }: Props) {
	return (
		<CardUI>
			<CardContent className='pt-3'>{children}</CardContent>
		</CardUI>
	);
}
