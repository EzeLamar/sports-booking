import Link from 'next/link';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink, Phone, Mail } from 'lucide-react';
import { Client } from '@/app/firebase/clients/model';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type Props = {
	client: Client;
};
function ClientCard({ client }: Props) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Card className='m-3 max-w-sm'>
			<Collapsible>
				<CardHeader>
					<CardTitle className='flex justify-between'>
						<div className='flex items-center gap-1'>
							<CollapsibleTrigger
								onClick={() => setIsOpen(!isOpen)}
								className='flex items-center gap-1'
							>
								<ChevronDown
									className={cn(
										'h-5 w-5 transition-transform duration-200',
										isOpen && 'rotate-180'
									)}
								/>
								{client.firstName} {client.lastName}
							</CollapsibleTrigger>
						</div>
						<div className='flex items-center justify-center'>
							<Button variant='ghost' size='icon' asChild>
								<Link href={`/clients/${client.id}`}>
									<ExternalLink className='h-6 w-6 text-primary' />
								</Link>
							</Button>
						</div>
					</CardTitle>
				</CardHeader>
				<CollapsibleContent>
					<CardContent>
						<div className='flex flex-col pl-3 gap-2'>
							<p className='flex items-center gap-1'>
								<Mail className='h-3 w-3' />
								{client.email ?? '-'}
							</p>
							<p className='flex items-center gap-1'>
								<Phone className='h-3 w-3' />
								{client.phone ?? '-'}
							</p>
						</div>
					</CardContent>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
}

export default ClientCard;
