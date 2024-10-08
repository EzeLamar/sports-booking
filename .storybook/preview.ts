import '../app/globals.css';
import type { Preview } from '@storybook/react';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
