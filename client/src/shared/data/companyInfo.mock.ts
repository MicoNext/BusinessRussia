import type { ICompanyInfo } from '@/../../package/types/models/companyInfo.d';

export const companyInfoMock: ICompanyInfo = {
	address: 'г. Черкесск, ул. Партизанская, 20, офис 406, БЦ «Кредо»',
	phone: '+7 (000) 000-00-00',
	email: 'example@deloros.ru',
	workingHours:
		'<strong>Пн–Пт:</strong> 09:00–18:00<br/><strong>Сб–Вс:</strong> выходной',
	map: {
		center: [37.618423, 55.751244],
		zoom: 10,
		address: 'Москва, Красная площадь',
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
