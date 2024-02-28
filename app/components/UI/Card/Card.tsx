type Props = {
	children: React.ReactNode;
};

export default function Card({ children }: Props) {
	return (
		<div className='card'>
			<div className='card-body'>{children}</div>
		</div>
	);
}
