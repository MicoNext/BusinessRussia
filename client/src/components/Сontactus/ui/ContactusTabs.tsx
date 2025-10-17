import { UnstyledButton } from '@/components/ui/buttons';
import clsx from 'clsx';

interface ContactusTabsProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export function ContactusTabs({ activeTab, setActiveTab }: ContactusTabsProps) {
	const activeClasses =
		'border-brand-primary/30 bg-brand-primary  cursor-not-allowed';
	const normalClasses = clsx(
		'bg-white/10 border-white/40',
		'hover:bg-brand-accent/30 hover:border-brand-accent/60'
	);
	const buttonClassNames = {
		general: clsx(
			'flex-1 text-white border rounded-md p-2 transition-all duration-300'
		),
		form: clsx(activeTab === 'form' ? activeClasses : normalClasses),
		pay: clsx(activeTab === 'pay' ? activeClasses : normalClasses),
	};

	return (
		<div className='flex flex-wrap gap-4'>
			<UnstyledButton
				name='form'
				disabled={activeTab === 'form'}
				classNames={{
					container: clsx(buttonClassNames.general, buttonClassNames.form),
					content: clsx('items-start'),
				}}
				onClick={() => setActiveTab('form')}
			>
				Хочу вступить
			</UnstyledButton>
			<UnstyledButton
				name='pay'
				disabled={activeTab === 'pay'}
				classNames={{
					container: clsx(buttonClassNames.general, buttonClassNames.pay),
					content: clsx('items-start'),
				}}
				onClick={() => setActiveTab('pay')}
			>
				Оплатить взнос
			</UnstyledButton>
		</div>
	);
}
