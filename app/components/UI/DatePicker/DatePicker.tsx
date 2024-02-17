import React, { useState } from 'react';

import {
  isSameMonth, subMonths, subDays,
  addMonths, getMonth, getYear,
} from 'date-fns';
import { ClassNames, DayPicker, Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from 'react-day-picker/dist/style.module.css';

type Props = {
  selectedDate: Date,
  setSelectedDate: (selectedDate: Date) => void,
  hidePastDays: boolean,
  monthsBackToBeShown: number,
  monthsForwardToBeShown: number,
  daysToDisable: Matcher[],
};

export default function DatePicker({
  setSelectedDate,
  selectedDate,
  hidePastDays = false,
  monthsBackToBeShown = 12,
  monthsForwardToBeShown = 3,
  daysToDisable = [],
}: Props) {
  const today = new Date();
  const initialShownDate = hidePastDays ? today : subMonths(today, monthsBackToBeShown);
  const finalShownDate = addMonths(today, monthsForwardToBeShown);
  const disabledDays : Matcher[] = [...daysToDisable];

  if (hidePastDays) {
    disabledDays.push({
      from: new Date(getYear(today), getMonth(today), 1),
      to: subDays(today, 1),
    });
  }

  const [monthShown, setMonthShown] = useState<Date>(today);
  const footer = (
    <button
      type="button"
      className="btn btn-primary btn-sm mx-auto d-block"
      disabled={isSameMonth(today, monthShown)}
      onClick={() => setMonthShown(today)}
    >
      Go to Today
    </button>
  );

  const classNames: ClassNames = {
    ...styles,
    day_today: 'fw-bold',
  };

  return (
    <DayPicker
      mode="single"
      captionLayout="dropdown-buttons"
      classNames={classNames}
      showOutsideDays
      fromMonth={initialShownDate}
      toMonth={finalShownDate}
      disabled={disabledDays}
      selected={selectedDate}
      onSelect={setSelectedDate}
      month={monthShown}
      onMonthChange={setMonthShown}
      footer={footer}
    />
  );
}
