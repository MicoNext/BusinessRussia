import { Headline } from '@/components/ui/Headline';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const contacts = [
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
		<section className='bg-brand-primary px-4 md:px-8 lg:px-12'>
			<div className='container mx-auto flex gap-4 md:gap-8'>
				<div className='flex-1 flex flex-col justify-between'>
					<Headline
						variant='light'
						title='Контакты для связи'
						description='Давайте вместе создадим что-то уникальное'
					/>
					<div className='flex flex-wrap gap-4'></div>
				</div>
				<div className='flex-1'></div>
			</div>
		</section>
	);
}
