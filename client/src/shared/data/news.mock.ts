import type { INews } from '@/../../package/types/models/news';
import { API_MOCK } from './api.mock';

export const newsMock: INews[] = [
	{
		_id: '1',
		slug: 'permskie-innovatory-1410',
		createdAt: new Date('2025-10-14T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/2f8/kj0amflyou99d9qwyvkiliouykjgczro/9988.png`,
			],
			videoUrl: [],
		},
		title:
			'Пермские инноваторы представили новые проекты и технологические решения',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
	{
		_id: '2',
		slug: 'v-ramkakh-foruma-inrussia',
		createdAt: new Date('2025-10-13T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/de5/u4kdhp2edqa22k72go1mkpmzwy42xqff/54655665.png`,
			],
			videoUrl: [],
		},
		title:
			'В рамках форума InRussia обсудили привлечение частных инвестиций в инфраструктуру в условиях высокой ключевой ставки',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
	{
		_id: '3',
		slug: 'razvitie-stroitelnoy',
		createdAt: new Date('2025-10-11T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/677/9yrgmf1fya193bd510iw5r4ljv2ytp2j/98798788.png`,
			],
			videoUrl: [],
		},
		title:
			'Развитие строительной отрасли региона обсудили на встрече Альянса подрядчиков',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
	{
		_id: '4',
		slug: 'permskoe-otdelenie-1010',
		createdAt: new Date('2025-10-10T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/2e4/gvm41s0h67eo1cemipzbv2mf9rli72u2/5454654.png`,
			],
			videoUrl: [],
		},
		title:
			'Пермское отделение «Деловой России» продолжает усиливать фокус на кадры',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
	{
		_id: '5',
		slug: 'ufns-po-permskomu-kr-091025',
		createdAt: new Date('2025-10-09T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/f9c/up9t6tm711amdf5xwrdsx85jqdh9kcly/654654654.png`,
			],
			videoUrl: [],
		},
		title:
			'УФНС по Пермскому краю представили новый региональный проект «Мои налоги – моему краю»',
		tags: ['partners'],
		html: '<p>Описание новости</p>',
		category: 'Новости партнеров',
	},
	{
		_id: '6',
		slug: 'gubernator-permskogo-091025',
		createdAt: new Date('2025-10-09T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/2be/xvp8czbqp95wghnna1vls01hejoa1ecz/95449141.png`,
			],
			videoUrl: [],
		},
		title:
			'Губернатор Пермского края приехал с визитом в компанию пермского делоросса',
		tags: ['partners'],
		html: '<p>Описание новости</p>',
		category: 'Новости партнеров',
	},
	{
		_id: '7',
		slug: 'v-permskom-otdelenii',
		createdAt: new Date('2025-10-08T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/a60/hyxnq1ud41intdwird1etnkb381i21c9/4654654.png`,
			],
			videoUrl: [],
		},
		title:
			'В пермском отделении «Деловой России» прошла установочная встреча Клуба активного долголетия',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
	{
		_id: '8',
		slug: 'permskoe-regionalnoe-0910',
		createdAt: new Date('2025-10-08T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/a45/zzja5a7si8hndfj8cx8zv9jigjk2my33/654654654.png`,
			],
			videoUrl: [],
		},
		title:
			'Пермское региональное отделение «Деловой России» завершило реализацию проекта — книга «Предприниматели и меценаты Прикамья»',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
	{
		_id: '9',
		slug: 'ustroystvo-kompanii-071025',
		createdAt: new Date('2025-10-07T00:00:00Z'),

		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/60f/gc53wlyg0yzjr5kekoux7lknb6oamt34/546546545588.png`,
			],
			videoUrl: [],
		},
		title:
			'В Перми разрабатывают неинвазивное устройство «Алко-Инспектор+» для выявления наркотических веществ',
		tags: ['partners'],
		html: '<p>Описание новости</p>',
		category: 'Новости партнеров',
	},
	{
		_id: '10',
		slug: 'deloros-travel-itogi',
		createdAt: new Date('2025-10-06T00:00:00Z'),
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/cce/2y78zhii1cfrlii0i5ft1ze1pxa2mr0y/46546546.png`,
			],
			videoUrl: [],
		},
		title: 'Deloros Travel: Итоги делового путешествия «Сочи-Абхазия»',
		tags: ['region'],
		html: '<p>Описание новости</p>',
		category: 'Новости регионального отделения',
	},
];
