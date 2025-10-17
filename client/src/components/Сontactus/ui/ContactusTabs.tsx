import { UnstyledButton } from '@/components/ui/buttons';
import clsx from 'clsx';

interface ContactusTabsProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export function ContactusTabs({ activeTab, setActiveTab }: ContactusTabsProps) {
	const buttonClassNames = {
		general: clsx(
			'flex-1 text-white border rounded-md p-2 transition-all duration-300',
			'hover:bg-brand-accent/30 hover:border-brand-accent/60'
		),
		form: clsx(
			activeTab === 'form'
				? 'bg-brand-accent/20 border-brand-accent/30'
				: 'border-brand-primary/80 bg-brand-primary/30'
		),
		pay: clsx(
			activeTab === 'pay'
				? 'bg-brand-accent/20 border-brand-accent/60'
				: 'border-brand-primary/80 bg-brand-primary/30'
		),
	};

	return (
		<div className='flex flex-wrap gap-4'>
			<UnstyledButton
				name='form'
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
