'use client';

import { Client } from '@/app/firebase/clients/model';
import { createContext } from 'react';

export const ClientsContext = createContext<Client[]>([]);
