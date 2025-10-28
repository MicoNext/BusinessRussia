import { Mail, Phone } from 'lucide-react';
import { Contacts } from '@/components/Сontactus/types';
import { Headline } from '@/components/ui/Headline';
import { ContactusCardGrid } from './ContactusCardGrid';
import { ContactusCardSlider } from './ContactusCardSlider';
import Image from 'next/image';
import { ICompanyInfo } from '../../../../../package/types/models/companyInfo';

type PropsType = {
	companyInfo: ICompanyInfo
}

export function ContactusCards({ companyInfo }: PropsType) {

	const contacts: Contacts[] = [
	{
		icon: <Phone />,
		title: companyInfo.phone ?? '+7 (999) 999-99-99',
		href: `tel:+${companyInfo.phone ?? '+7 (999) 999-99-99'}`,
	},
	{
		icon: <Mail />,
		title: companyInfo.email || 'example@mail.com',
		href: `mailto:${companyInfo.email || "example@mail.com"}`,
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
		href: `https://wa.me/${companyInfo.phone}`,
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
		href: companyInfo.telegramUrl || 'https://t.me/example',
	},
];


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
