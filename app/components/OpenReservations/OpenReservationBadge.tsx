'use client';

import React from 'react';
import BadgePill from '../UI/BadgePill';
import './OpenReservationBadge.css';

type Props = {
    initialTime: string,
    selected: boolean,
    select: () => void,
};

export default function OpenReservationBage({ initialTime, selected, select }: Props) {
  const classes = `open-reservation-badge__container ${selected ? 'btn-primary' : 'btn-outline-secondary'}`;

  return (
    <BadgePill className={classes} handleClick={() => select()}>
      {initialTime}
    </BadgePill>
  );
}
