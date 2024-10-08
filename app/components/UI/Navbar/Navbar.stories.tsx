import type { Meta, StoryObj } from '@storybook/react';
import { User } from 'firebase/auth';
import { AuthContext } from '@/app/context/AuthContext';
import NavBar from './Navbar';

const meta = {
	title: 'Page/Navbar/Navbar',
	component: NavBar,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof NavBar>;

export default meta;

const userLogged: User = {
	email: 'test@gmail.com',
	emailVerified: false,
	isAnonymous: false,
	// @ts-expect-error mock value only need for testing
	metadata: undefined,
	providerData: [],
	refreshToken: '',
	tenantId: null,
	delete: () => {
		throw new Error('Function not implemented.');
	},
	getIdToken: () => {
		throw new Error('Function not implemented.');
	},
	getIdTokenResult: () => {
		throw new Error('Function not implemented.');
	},
	reload: () => {
		throw new Error('Function not implemented.');
	},
	toJSON: () => {
		throw new Error('Function not implemented.');
	},
	displayName: 'Test User',
	phoneNumber: '0303456',
	photoURL: null,
	providerId: '',
	uid: '',
};

type Story = StoryObj<typeof meta>;

export const Logged: Story = {
	decorators: [
		() => (
			<AuthContext.Provider value={userLogged}>
				<NavBar />
			</AuthContext.Provider>
		),
	],
};

export const NotLogged: Story = {
	decorators: [
		() => (
			<AuthContext.Provider value={null}>
				<NavBar />
			</AuthContext.Provider>
		),
	],
};
