import { UnstyledButton } from '@/components/ui/buttons';
import clsx from 'clsx';

interface ContactusTabsProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export function ContactusTabs({ activeTab, setActiveTab }: ContactusTabsProps) {
	return (
		<div className='flex flex-wrap gap-4'>
			<UnstyledButton
				name='form'
				classNames={{
					container: clsx(
						'flex-1 text-white/80 border border-brand-accent/20 bg-brand-accent/10 rounded-md p-2 transition-all duration-300',
						'hover:bg-brand-accent/20 hover:border-brand-accent/30',
						activeTab === 'form' && 'bg-brand-accent/20 border-brand-accent/30'
					),
				}}
				onClick={() => setActiveTab('form')}
			>
				Хочу вступить
			</UnstyledButton>
			<UnstyledButton
				name='pay'
				classNames={{
					container: clsx(
						'flex-1 text-white/80 border border-brand-accent/20 bg-brand-accent/10 rounded-md p-2 transition-all duration-300',
						'hover:bg-brand-accent/20 hover:border-brand-accent/30',
						activeTab === 'pay' && 'bg-brand-accent/20 border-brand-accent/30'
					),
					content: clsx('items-start'),
				}}
				onClick={() => setActiveTab('pay')}
			>
				Оплатить взнос
			</UnstyledButton>
		</div>
	);
}
