import { RuTubeIcon, TelegramIcon, VkIcon } from '@/components/ui/socialIcons';

export const SOCIAL_MEDIA = [
	{
		icon: (
			<VkIcon
				width={18}
				height={18}
			/>
		),
		href: 'https://vk.com/business_russia',
	},
	{
		icon: (
			<TelegramIcon
				width={18}
				height={18}
			/>
		),
		href: 'https://t.me/business_russia',
	},
	{
		icon: (
			<RuTubeIcon
				width={18}
				height={18}
				fill='currentColor'
			/>
		),
		href: 'https://rt.pravda.ru/business/',
	},
];
