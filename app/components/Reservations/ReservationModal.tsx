import React from 'react';
import Modal from '../UI/Modal/Modal';
import ReservationForm, {
	InitialReservation,
	Reservation,
} from './ReservationForm';

const LABELS = {
	MODAL_TITLE: 'Reserva:',
};

type Props = {
	show: boolean;
	reservation: InitialReservation;
	handleClose: () => void;
	handleSubmit: (data: Reservation) => Promise<boolean>;
	handleCancel: () => void;
	minDate?: Date | null;
	maxDate?: Date | null;
	editable?: boolean;
};

export default function ReservationModal({
	show,
	reservation,
	handleSubmit,
	handleClose,
	handleCancel = () => {},
	editable = false,
	minDate = null,
	maxDate = null,
}: Props) {
	return (
		<Modal
			show={show}
			title={LABELS.MODAL_TITLE}
			onClose={() => handleClose()}
			showFooter={false}
		>
			<ReservationForm
				reservation={reservation}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
				editable={editable}
				minDate={minDate}
				maxDate={maxDate}
				showTitle={false}
			/>
		</Modal>
	);
}
