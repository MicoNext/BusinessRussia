import type { ICompanyInfo } from '@/../../package/types/models/companyInfo.d';

export const companyInfoMock: ICompanyInfo = {
	address: 'г. Черкесск, ул. Партизанская, 20, офис 406, БЦ «Кредо»',
	phone: '+7 (000) 000-00-00',
	email: 'example@deloros.ru',
	workingHours:
		'<strong>Пн–Пт:</strong> 09:00–18:00<br/><strong>Сб–Вс:</strong> выходной',
	map: {
		ymapApiKey: '7dd76431-0f47-4a79-9a5a-3f42c319bacb',
		centerCoordinates: '44.23845, 42.047587',
		zoomDefault: 15,
	},
	logo: {
		imageUrl: '/logo-full.svg',
		alt: 'Деловая Россия',
	},
	socialMedia: [
		{ iconName: 'vk', href: 'https://vk.com/business_russia', title: 'VK' },
		{
			iconName: 'telegram',
			href: 'https://t.me/business_russia',
			title: 'Telegram',
		},
		{
			iconName: 'rutube',
			href: 'https://rt.pravda.ru/business/',
			title: 'RuTube',
		},
	],
};
