import { ISliderMain } from '@/../../package/types/models/sliderMain.d';

const MOCK_DOMAIN = 'https://deloros-perm.ru';

export const sliderMainMock: ISliderMain[] = [
	{
		_id: '1',
		createdAt: new Date(),
		type: 'img',
		url: `${MOCK_DOMAIN}/upload/iblock/1fb/mn1m5hpw3buor8bclb1cy6zqatfm50as/U3yQvzlYLmM.jpg`,
		title:
			'<h1>Эксклюзивный контент, удобство, интерактивность - все в нашем Телеграм-канале</h1>',
		overlay: true,
		tags: [],
		sourse: {
			buttonName: 'Подробнее',
			url: 'https://deloros-perm.ru/news/regional-office/eksklyuzivnyy-konten/',
		},
	},
	{
		_id: '2',
		createdAt: new Date(),
		type: 'img',
		url: 'https://deloros-perm.ru/upload/iblock/08a/3rb4olrc4higmhzmhbg07p933lxzyjdm/dr-295.jpg',
		title:
			'<h2>Пермское отделение «Деловой России» заняло ТРЕТЬЕ место среди региональных отделений страны!</h2>',
		overlay: true,
		tags: [],
		sourse: {
			buttonName: 'Подробнее',
			url: 'https://deloros-perm.ru/news/regional-office/permskoe-otdelenie-dfhhh/',
		},
	},
	{
		_id: '3',
		createdAt: new Date(),
		type: 'img',
		url: `${MOCK_DOMAIN}/upload/iblock/2da/ra9bjad3am1v2o3te6u2gj4erffmyssj/grgtsg.png`,
		subtitle: 'В рамках пленарного заседания XX съезда «Деловой России»',
		title:
			'<h2>Президент России Владимир Путин дал ряд поручений по итогам встречи с членами «Деловой России»</h2>',
		overlay: true,
		tags: [],
		sourse: {
			buttonName: 'Подробнее',
			url: 'https://deloros-perm.ru/news/partners/prezident-utverdil-p/',
		},
		text: 'В рамках пленарного заседания XX съезда «Деловой России»',
	},
	{
		_id: '4',
		createdAt: new Date(),
		type: 'video',
		url: `${MOCK_DOMAIN}/upload/iblock/c98/kci1xde2vvs4y3hn151j241uid2y3jqt/Интервью Скрипников_Trimopi.mp4`,
		subtitle: 'Кейс',
		title:
			'<h2>«Благодаря «Деловой России» доходы предприятия выросли до 100 миллионов рублей»</h2>',
		tags: ['Кейс'],
		text: '',
		overlay: true,
		sourse: {
			buttonName: 'Подробнее',
			url: 'https://deloros-perm.ru/news/regional-office/blagodarya-delovoy-r/',
		},
	},
];

export const props = {
	sliderMain: sliderMainMock,
};
