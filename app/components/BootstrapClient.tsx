'use client';

import { useEffect } from 'react';

function BootstrapClient() {
	useEffect((): void => {
		// eslint-disable-next-line global-require
		require('bootstrap/dist/js/bootstrap.bundle.min');
	}, []);

	return null;
}

export default BootstrapClient;
