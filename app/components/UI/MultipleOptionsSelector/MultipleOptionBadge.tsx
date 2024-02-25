'use client';

import React from 'react';
import './MultipleOptionBadge.css';
import BadgePill from '../BadgePill/BadgePill';

type Props = {
	label: string;
	selected: boolean;
	select: () => void;
};

export default function MultipleOptionBadge({
	label,
	selected,
	select,
}: Props) {
	const classes = `multiple-option-badge__container ${selected ? 'btn-primary' : 'btn-secondary'}`;

	return (
		<BadgePill className={classes} handleClick={() => select()}>
			{label}
		</BadgePill>
	);
}
