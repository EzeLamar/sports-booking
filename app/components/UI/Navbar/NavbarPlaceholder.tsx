import Link from 'next/link';
import Image from 'next/image';

export default function NavbarPlaceholder() {
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
					Sports Booking App
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
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className='nav-link active' aria-current='page' href='/'>
								Home
							</Link>
						</li>
					</ul>
					<p className='placeholder-glow'>
						<span className='placeholder col-1' />
					</p>
					<p className='btn btn-primary disabled placeholder col-1' />
				</div>
			</div>
		</nav>
	);
}
