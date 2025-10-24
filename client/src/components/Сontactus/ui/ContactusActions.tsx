'use client';

import { useState } from 'react';
import { ContactusTabs } from './ContactusTabs';
import { ContactusPay } from './ContactusPay';
import { Form } from '@/components/Form';

interface ContactusActionsProps {}

export function ContactusActions() {
	const [activeTab, setActiveTab] = useState<string>('form');

	return (
		<>
			<Form
				id='contactus'
				variant='dark'
			/>
		</>
	);
}
