'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import hasErrorMessage from '../../../utils/Error/ErrorHelper';
import { useAuthContext } from '../../../context/AuthContext';
import logout from '../../../firebase/auth/signout';

export default function NavBar() {
	const user = useAuthContext();
	const pathName = usePathname();

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
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<Link className='navbar-brand' href='/'>
					<Image
						className='d-inline-block align-top'
						src='\app-logo.svg'
						alt='Logo'
						width={30}
						height={30}
					/>
					Sports Booking
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						{user ? (
							<li className='nav-item'>
								<Link
									className={`nav-link ${pathName === '/courts' ? 'active' : ''}`}
									href='/courts'
								>
									Courts
								</Link>
							</li>
						) : (
							<li className='nav-item'>
								<Link
									className={`nav-link ${pathName === '/' ? 'active' : ''}`}
									aria-current='page'
									href='/'
								>
									Home
								</Link>
							</li>
						)}
					</ul>
					{user && (
						<>
							<span className='navbar-text'>{user.email}</span>
							<button
								className='btn btn-outline-danger ms-1 my-2 my-sm-0'
								type='button'
								onClick={handleLogout}
							>
								Cerrar Sesión
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
