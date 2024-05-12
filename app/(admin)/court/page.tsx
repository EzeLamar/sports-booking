import { Metadata } from 'next';
import CourtSettingsView from './CourtSettingsView';

export const metadata: Metadata = {
	title: 'Court',
	description: 'Sport-Booking Court Section',
};

export default function CourtPage() {
	return <CourtSettingsView />;
}
