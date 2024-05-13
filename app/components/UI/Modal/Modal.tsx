import Button from 'react-bootstrap/Button';
import ReactModal from 'react-bootstrap/Modal';

type Props = {
	show: boolean;
	title: string;
	onSubmit?: () => void;
	onClose: () => void;
	children: React.ReactNode;
	showFooter?: boolean;
};

export default function Modal({
	show,
	title,
	children,
	onSubmit = () => {},
	onClose,
	showFooter = true,
}: Props) {
	const handleClose = () => {
		onClose();
	};

	const handleSubmit = () => {
		onSubmit();
	};

	return (
		<ReactModal show={show} onHide={handleClose}>
			<ReactModal.Header closeButton>
				<ReactModal.Title>{title}</ReactModal.Title>
			</ReactModal.Header>
			<ReactModal.Body>{children}</ReactModal.Body>
			{showFooter && (
				<ReactModal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleSubmit}>
						Save Changes
					</Button>
				</ReactModal.Footer>
			)}
		</ReactModal>
	);
}
