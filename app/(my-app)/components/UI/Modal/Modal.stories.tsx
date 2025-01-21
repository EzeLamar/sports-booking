import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';

const meta = {
	title: 'UI/Modal',
	component: Modal,
	parameters: {},
	tags: [],
	argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

// @ts-expect-error useState ts limitation on storybook
export const Show: Story = {
	decorators: [
		() => {
			const [show, setShow] = useState<boolean>(true);

			return (
				<Modal
					show={show}
					title='Modal Title'
					onSubmit={() => setShow(false)}
					onClose={() => setShow(false)}
				>
					Content of the Modal
				</Modal>
			);
		},
	],
};

// @ts-expect-error useState ts limitation on storybook
export const WithoutFooter: Story = {
	decorators: [
		() => {
			const [show, setShow] = useState<boolean>(true);

			return (
				<Modal
					show={show}
					title='Modal Title'
					onSubmit={() => setShow(false)}
					onClose={() => setShow(false)}
					showFooter={false}
				>
					Content of the Modal
				</Modal>
			);
		},
	],
};
