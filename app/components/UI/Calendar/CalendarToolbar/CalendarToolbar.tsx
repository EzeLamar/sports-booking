import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { View, Views } from 'react-big-calendar';
import moment from 'moment';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const options = [
	{ value: 'month', label: 'Mes' },
	{ value: 'week', label: 'Semana' },
	{ value: 'day', label: 'Día' },
	{ value: 'agenda', label: 'Agenda' },
];

type Props = {
	courtName: string;
	currentDay: Date;
	setCurrentDay: (date: Date) => void;
	currentView: View;
	handleCurrentViewChange: (view: View) => void;
	showAll: boolean;
	setShowAll: (showAll: boolean) => void;
};

export default function CalendarToolbar({
	courtName,
	currentDay,
	setCurrentDay,
	currentView,
	showAll,
	setShowAll,
	handleCurrentViewChange,
}: Props) {
	const handleLeftArrowClick = () => {
		const day = moment(currentDay);
		switch (currentView) {
			case Views.MONTH:
				setCurrentDay(day.subtract(1, 'month').toDate());
				break;
			case Views.WEEK:
				setCurrentDay(day.subtract(1, 'week').toDate());
				break;
			case Views.DAY:
				setCurrentDay(day.subtract(1, 'day').toDate());
				break;
			case Views.AGENDA:
				setCurrentDay(day.subtract(1, 'week').toDate());
				break;
			default:
				break;
		}
	};

	const showDateRangeByView = (): string => {
		const day = moment(currentDay);
		switch (currentView) {
			case Views.MONTH:
				return day.format('MMMM YYYY');
			case Views.WEEK:
			case Views.AGENDA:
				return `${day.format('D [de] MMMM YYYY')} - ${day.add(6, 'day').format('D [de] MMMM YYYY')}`;
			case Views.DAY:
				return `${day.format('dddd D [de] MMMM YYYY')}`;
			default:
				return '';
		}
	};

	const handleRightArrowClick = () => {
		const day = moment(currentDay);
		switch (currentView) {
			case Views.MONTH:
				setCurrentDay(day.add(1, 'month').toDate());
				break;
			case Views.WEEK:
				setCurrentDay(day.add(1, 'week').toDate());
				break;
			case Views.DAY:
				setCurrentDay(day.add(1, 'day').toDate());
				break;
			case Views.AGENDA:
				setCurrentDay(day.add(1, 'week').toDate());
				break;
			default:
				break;
		}
	};

	return (
		<nav className='flex flex-col justify-between'>
			<h2 className='text-center text-xl font-bold'>{courtName}</h2>
			<h3 className='text-center text-l'>{showDateRangeByView()}</h3>
			<nav className='px-4 flex items-center justify-between py-4 gap-4'>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setCurrentDay(new Date())}
					>
						Hoy
					</Button>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							size='icon'
							onClick={handleLeftArrowClick}
						>
							<ChevronLeft className='h-4 w-4' />
						</Button>
						<Button
							variant='outline'
							size='icon'
							onClick={handleRightArrowClick}
						>
							<ChevronRight className='h-4 w-4' />
						</Button>
					</div>
				</div>
				<Select value={currentView} onValueChange={handleCurrentViewChange}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select view' />
					</SelectTrigger>
					<SelectContent
						ref={ref =>
							// temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
							ref?.addEventListener('touchend', e => e.preventDefault())
						}
					>
						{options.map(option => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</nav>
			{currentView !== Views.MONTH && (
				<div className='flex justify-center items-center space-x-2'>
					<Label htmlFor='show-all-mode'>Mostrar Fuera de Horario Cancha</Label>
					<Switch id='show-all-mode' onClick={() => setShowAll(!showAll)} />
				</div>
			)}
		</nav>
	);
}
