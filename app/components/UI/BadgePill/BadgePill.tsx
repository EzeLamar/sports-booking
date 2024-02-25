import React from 'react';

type Props = {
	className?: string;
	children: string;
	handleClick?: () => void;
};

export default function BadgePill({
	className = 'btn-primary',
	children,
	handleClick = () => {},
}: Props) {
	const classes = `btn ${className}`;
	return (
		<button type='button' className={classes} onClick={() => handleClick()}>
			{children}
		</button>
	);
}
