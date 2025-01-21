'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Skeleton } from '@/components/ui/skeleton';

export default function NavbarPlaceholder() {
	return (
		<header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<NavigationMenu>
					<NavigationMenuList>
						<Link href='/' legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<Image
									className='d-inline-block align-top'
									src='\app-logo.svg'
									alt='Logo'
									width={30}
									height={30}
								/>
								<span className='ml-1 text-xl'>Sport Booking</span>
							</NavigationMenuLink>
						</Link>
						<NavigationMenuItem>
							<Skeleton className='h-4 w-[100px]' />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			<Skeleton className='h-7 w-7 rounded md:hidden' />
			<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
				<div className='ml-auto flex-initial'>
					<Skeleton className='h-12 w-12 rounded-full' />
				</div>
			</div>
		</header>
	);
}
