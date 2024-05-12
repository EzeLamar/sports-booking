import React from 'react';

export default function Loading() {
	return (
		<div className='d-flex pt-3 justify-content-center'>
			<div className='spinner-border text-primary'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
}
