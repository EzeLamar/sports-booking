'use client';

import { Court } from '@/app/(my-app)/components/Courts/CourtSettings/CourtSettings';
import { createContext } from 'react';

export const CourtContext = createContext<Court | null>(null);
