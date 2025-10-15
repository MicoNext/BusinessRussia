'use client';

import { useState } from 'react';
import { ContactusTabs } from './ContactusTabs';
import { ContactusForm } from './ContactusForm';
import { ContactusPay } from './ContactusPay';

interface ContactusActionsProps {}

export function ContactusActions() {
	const [activeTab, setActiveTab] = useState<string>('form');

	return (
		<>
			<div className='border-b border-white/10 pb-4 md:pb-8'>
				<ContactusTabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
			{activeTab === 'form' && <ContactusForm />}
			{activeTab === 'pay' && <ContactusPay />}
		</>
	);
}
