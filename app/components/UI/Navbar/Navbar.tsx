'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'react-toastify';
import hasErrorMessage from '../../../utils/Error/ErrorHelper';
import { useAuthContext } from '../../../context/AuthContext';
import logout from '../../../firebase/auth/signout';

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
					Sports Booking Appp
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
						<li className='nav-item'>
							<Link className='nav-link active' aria-current='page' href='/'>
								Home
							</Link>
						</li>
						{user && (
							<>
								<li className='nav-item'>
									<Link className='nav-link' href='/admin'>
										Admin
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' href='/admin/court'>
										Court Settings
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' href='/admin/reservations'>
										Reservations
									</Link>
								</li>
							</>
						)}
					</ul>
					{user ? (
						<>
							<span className='navbar-text'>{user.email}</span>
							<button
								className='btn btn-outline-danger my-2 my-sm-0'
								type='button'
								onClick={handleLogout}
							>
								Cerrar Sesión
							</button>
						</>
					) : (
						<Link className='btn btn-primary' href='/signin'>
							Ingresar
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
