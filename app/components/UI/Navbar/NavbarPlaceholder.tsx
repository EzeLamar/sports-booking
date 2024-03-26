'use client';

import React from 'react';
import Link from 'next/link';

export default function NavbarPlaceholder() {
	return (
		<nav
			style={{ color: 'red' }}
			className='navbar navbar-expand-lg bg-body-tertiary'
		>
			<div className='container-fluid'>
				Sports Booking App
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
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className='nav-link active' aria-current='page' href='/'>
								Home
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
