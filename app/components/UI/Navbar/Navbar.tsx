'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logout from '@/app/firebase/auth/signout';
import { useAuthContext } from '@/app/context/AuthContext';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { ModeToggle } from '@/app/components/ModeToggle';

export default function NavBar() {
	const user = useAuthContext();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error: unknown) {
			if (hasErrorMessage(error)) {
				toast.error(error.message, { theme: 'colored' });
			}
		}
	};

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
						{user ? (
							<NavigationMenuItem>
								<Link href='/courts' legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Canchas
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						) : (
							<NavigationMenuItem>
								<Link href='/' legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Home
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
						<Menu className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent className='w-[300px] sm:w-[240px]' side='left'>
					<nav className='grid gap-6 text-lg font-medium'>
						<SheetHeader>
							<SheetTitle>
								<div className='flex items-center gap-2'>
									<Image
										className='d-inline-block align-top'
										src='\app-logo.svg'
										alt='Logo'
										width={30}
										height={30}
									/>
									<span>Sport Booking</span>
								</div>
							</SheetTitle>
						</SheetHeader>
						{!user && (
							<SheetClose asChild>
								<Link
									href='/'
									className='flex items-center gap-2 text-lg font-semibold'
								>
									Home
								</Link>
							</SheetClose>
						)}
						<SheetClose asChild>
							{user ? (
								<Link
									href='/courts'
									className='text-muted-foreground hover:text-foreground'
								>
									Canchas
								</Link>
							) : (
								<Link
									href='/signin'
									className='text-muted-foreground hover:text-foreground'
								>
									Iniciar Sesión
								</Link>
							)}
						</SheetClose>
					</nav>
				</SheetContent>
			</Sheet>
			<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
				<div className='ml-auto flex-initial'>
					<ModeToggle />
				</div>
				{user && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='secondary' size='icon' className='rounded-full'>
								<Avatar>
									<AvatarImage src={user?.photoURL ?? undefined} />
									<AvatarFallback>...</AvatarFallback>
								</Avatar>
								<span className='sr-only'>Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button variant='destructive' onClick={handleLogout}>
									Cerrar Sesión
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</header>
	);
}
