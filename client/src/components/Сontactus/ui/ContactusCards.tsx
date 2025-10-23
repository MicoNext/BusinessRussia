import { Mail, Phone } from 'lucide-react';
import { Contacts } from '@/components/Сontactus/types';
import { Headline } from '@/components/ui/Headline';
import { ContactusCardGrid } from './ContactusCardGrid';
import { ContactusCardSlider } from './ContactusCardSlider';
import Image from 'next/image';

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

export function ContactusCards() {
	return (
		<>
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
		</>
	);
}
