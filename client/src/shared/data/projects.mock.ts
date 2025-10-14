import type { IProject } from '@/../../package/types/models/projects';
import { API_MOCK } from './api.mock';

export const projectsMock: IProject[] = [
	{
		_id: 'p1',
		slug: 'predlozhit-invest-proekt',
		url: '/projects/',
		createdAt: new Date('2025-10-14T00:00:00Z'),
		header: { title: 'Предложить свой инвестиционный проект' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/4dd/4dd7ddacb909a7c6e9854952e82b09d1.png`,
			],
			videoUrl: [],
		},
		title: 'Предложить свой инвестиционный проект',
		tags: ['projects'],
		html: '<p>Участвовать в проектной деятельности «Деловой России»</p>',
		category: 'Участвовать в проектной деятельности «Деловой России»',
	},
	{
		_id: 'p2',
		slug: 'stat-partnerom',
		url: 'https://deloros-perm.ru/organization/partners/',
		createdAt: new Date('2025-10-13T00:00:00Z'),
		header: { title: 'Стать партнером' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/be3/be373072a5f68d560de8448da19bb7ae.png`,
			],
			videoUrl: [],
		},
		title: 'Стать партнером',
		tags: ['partners'],
		html: '<p>Узнать, как развивать бизнес быстро, просто и выгодно</p>',
		category: 'Узнать, как развивать бизнес быстро, просто и выгодно',
	},
	{
		_id: 'p3',
		slug: 'podat-anons',
		url: 'https://docs.google.com/forms/d/e/1FAIpQLScvLoeWKutwsQkZahg0dgiEb_WBlJQt5JZlU_tcEBJXNOVeKQ/viewform',
		createdAt: new Date('2025-10-11T00:00:00Z'),
		header: { title: 'Подать анонс' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/9ee/9ee3779146f59815bf661d97d58545ff.png`,
			],
			videoUrl: [],
		},
		title: 'Подать анонс',
		tags: ['events'],
		html: '<p>Сообщить об участии в мероприятии</p>',
		category: 'Сообщить об участии в мероприятии',
	},
	{
		_id: 'p4',
		slug: 'prisoedinyaytes',
		url: 'https://deloros-perm.ru/organization/kak-vstupit/',
		createdAt: new Date('2025-10-10T00:00:00Z'),
		header: {
			title: 'Присоединяйтесь к крупнейшему сообществу предпринимателей',
		},
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/e1c/e1c790588ceb33d0318c162daaef5fd2.png`,
			],
			videoUrl: [],
		},
		title: 'Присоединяйтесь к крупнейшему сообществу предпринимателей',
		tags: ['join'],
		html: '<p>Уже подготовили 20 предложений о изменении законодательства и правил. Уже завтра среди них могут быть ваши!</p>',
		category: 'Уже подготовили 20 предложений...',
		isBig: true,
	},
	{
		_id: 'p5',
		slug: 'voyti-v-sovet',
		url: 'https://deloros-perm.ru/boards/',
		createdAt: new Date('2025-10-09T00:00:00Z'),
		header: { title: 'Войти в совет' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/891/89144ebafb1f9dfccd82660194fd715e.png`,
			],
			videoUrl: [],
		},
		title: 'Войти в совет',
		tags: ['boards'],
		html: '<p>Стать участником экспертных органов «Деловой России»</p>',
		category: 'Стать участником экспертных органов «Деловой России»',
	},
	{
		_id: 'p6',
		slug: 'poluchit-lgotnoe-finansirovanie',
		url: 'https://deloros-perm.ru/services/obshchie-uslugi/finansovyy-ekonomicheskiy-audit/',
		createdAt: new Date('2025-10-08T00:00:00Z'),
		header: { title: 'Получить льготное финансирование' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/179/179aa1553d0b536559ca9c0c46cec26e.png`,
			],
			videoUrl: [],
		},
		title: 'Получить льготное финансирование',
		tags: ['services'],
		html: '<p>Наши члены уже получили льготы на сумму более 1 млрд рублей</p>',
		category: 'Наши члены уже получили льготы на сумму более 1 млрд рублей',
	},
	{
		_id: 'p7',
		slug: 'zakazat-meropriyatie',
		url: 'https://docs.google.com/forms/d/e/1FAIpQLSfV_fcpd6Adr6XcB7OU-9RhZp8M1l56rUqBA73h56E2pfgSJA/viewform',
		createdAt: new Date('2025-10-07T00:00:00Z'),
		header: { title: 'Заказать мероприятие' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/1c3/photo_2021-11-23_18-21-39.jpg`,
			],
			videoUrl: [],
		},
		title: 'Заказать мероприятие',
		tags: ['events'],
		html: '<p>Команда профессионалов ПК РО "Деловая Россия" организует и проведет Ваше мероприятие «под ключ»</p>',
		category:
			'Команда профессионалов ПК РО «Деловая Россия» организует и проведет Ваше мероприятие «под ключ»',
	},
	{
		_id: 'p8',
		slug: 'servisy',
		url: 'https://deloros-perm.ru/services/',
		createdAt: new Date('2025-10-06T00:00:00Z'),
		header: { title: 'Сервисы' },
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/a77/a77bb61c485a71a8cdd715a17e3cbb3a.png`,
			],
			videoUrl: [],
		},
		title: 'Сервисы',
		tags: ['services'],
		html: '<p>Использовать возможности «Деловой России»</p>',
		category: 'Использовать возможности «Деловой России»',
	},
];
