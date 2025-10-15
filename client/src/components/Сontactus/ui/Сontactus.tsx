import { Headline } from '@/components/ui/Headline';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { ContactusCardGrid } from './ContactusCardGrid';
import { ContactusCardSlider } from './ContactusCardSlider';
import { Contacts } from '@/components/Сontactus/types';
import clsx from 'clsx';

const contacts: Contacts[] = [
	{
		icon: <Phone />,
		title: '+7 (999) 999-99-99',
		href: 'tel:+79999999999',
	},
	{
		icon: <Mail />,
		title: 'example@mail.com',
		href: 'mailto:example@mail.com',
	},
	{
		icon: (
			<Image
				src='/social/wa-icon.svg'
				alt=''
				width={24}
				height={24}
				aria-hidden='true'
			/>
		),
		title: 'WhatsApp',
		href: 'https://wa.me/79999999999',
	},
	{
		icon: (
			<Image
				src='/social/tg-icon.svg'
				alt=''
				width={24}
				height={24}
				aria-hidden='true'
			/>
		),
		title: 'Telegram',
		href: 'https://t.me/example',
	},
];

export function Сontactus() {
	return (
		<section className='bg-[#08041a] px-4 md:px-8 lg:px-12 border-b border-white/10'>
			<div className='container mx-auto flex flex-col md:flex-row gap-4 md:gap-8'>
				<div
					className={clsx(
						'flex-1 flex flex-col justify-between gap-8 py-14 border-b border-white/10 pb-14',
						'md:border-r md:border-white/10 md:pr-14'
					)}
				>
					<Headline
						variant='light'
						title='Контакты для связи'
						description='Давайте вместе создадим что-то уникальное'
						classNames={{
							container: 'flex flex-col gap-2',
							subtitle: 'text-white/80',
							title: 'text-white/90',
							description: 'text-white/80',
						}}
					/>
					<div className='flex flex-col gap-2'>
						<p className='text-white/80 text-sm'>Не любите формы?</p>
						<ContactusCardSlider
							items={contacts}
							classNames={{ container: 'md:hidden' }}
						/>
						<ContactusCardGrid
							items={contacts}
							classNames={{ container: 'hidden md:grid' }}
						/>
					</div>
				</div>
				<div className='flex-1'></div>
			</div>
		</section>
	);
}
