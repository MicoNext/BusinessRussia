import type { ICommittee } from '@/../../package/types/models/committee';
import { API_MOCK } from './api.mock';

const htmlContent = `<div class="content" itemprop="description">
																												<div>
	<span style="font-size: 20pt;"><b>Задачи комитета:&nbsp;</b><br>
	<br>
	</span>
</div>
 1) Консоли<span style="font-size: 11pt;">дация опыта и компетенций в области экспертизы инвестиционных проектов путем привлечения инвесторов и партнеров к работе комитета;</span><br>
<span style="font-size: 11pt;"> </span><br>
<span style="font-size: 11pt;">
2) Аудит инвестиционных проектов членов и партнеров «Деловой России» с целью оказания помощи в их реализации, в том числе с поддержкой региона;</span><br>
<span style="font-size: 11pt;"> </span><br>
<span style="font-size: 11pt;">
3) Помощь в привлечении финансирования и подбор мер поддержки от государства (федеральные и региональные программы);&nbsp;</span><br>
<span style="font-size: 11pt;"> </span><br>
<span style="font-size: 11pt;">
4) Отбор потенциально значимых и перспективных проектов и лоббирование реализации проектов на региональном и федеральном уровнях;&nbsp;</span><br>
<span style="font-size: 11pt;"> </span><br>
<span style="font-size: 11pt;">
5) Выстраивание сотрудничества с финансовыми институтами, органами власти, инициаторами проектов и инвесторами с целью помощи в реализации инвестиционных проектов, развития инвестиционного климата в регионе и повышения конверсии и эффективности от реализации проектов;</span><br>
<span style="font-size: 11pt;"> </span><br>
<span style="font-size: 11pt;">
6) Мониторинг инвестиционного климата Пермского края, анализ работы механизма мер поддержки бизнеса на уровне региона и подготовка предложений, отзывов и заключений по вопросам их улучшения.&nbsp;&nbsp;</span><br>
 <br>
<h2></h2>
 <br>													</div>`;

export const committeesMock: ICommittee[] = [
	{
		_id: '1631',
		slug: 'investments',
		createdAt: new Date('2025-01-01T00:00:00Z'),
		title: 'Комитет по финансам и инвестициям',
		description: 'Комитет по финансам и инвестициям',
		html: htmlContent,
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/0b0/0b06b4c2e694b2cff8e62873992bd5f6.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '5575',
		slug: 'komitet-po-kadram',
		createdAt: new Date('2025-01-02T00:00:00Z'),
		title: 'Комитет по кадрам',
		description: 'Комитет по кадрам',
		html: htmlContent,
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/c13/ricqx8v8qc0fimxi1qvxks5l8bywhtwx/%2B8451%2B5.png`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '5350',
		slug: 'komitet-revers-inzhiniringa-i-reinzhiniringa-v-mashinostroenii',
		createdAt: new Date('2025-01-03T00:00:00Z'),
		title: 'Комитет реверс-инжиниринга и реинжиниринга в машиностроении',
		description: 'Комитет реверс-инжиниринга и реинжиниринга в машиностроении',
		html: '<p>Описание комитета реверс-инжиниринга и реинжиниринга.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/728/r22991m7xj43u7v3oy7j3w851dxyra6k/reverse-engineering-1-1.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '189',
		slug: 'industry',
		createdAt: new Date('2025-01-04T00:00:00Z'),
		title: 'Комитет по промышленности',
		description: 'Комитет по промышленности',
		html: htmlContent,
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/e84/e846c3b886bf92cc191c73a35821c2cc.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1965',
		slug: 'komitet-po-it-i-tsifrovizatsii',
		createdAt: new Date('2025-01-05T00:00:00Z'),
		title: 'Комитет по ИТ и цифровизации',
		description: 'Комитет по ИТ и цифровизации',
		html: htmlContent,
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/ada/fintech_TS-664731514.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '3103',
		slug: 'komitet-po-razvitiyu-optovoy-i-roznichnoy-torgovli',
		createdAt: new Date('2025-01-06T00:00:00Z'),
		title: 'Комитет по развитию оптовой и розничной торговли',
		description: 'Комитет по развитию оптовой и розничной торговли',
		html: '<p>Описание комитета по развитию оптовой и розничной торговли.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/411/1588686198_1579425439_47-108.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '182',
		slug: 'building',
		createdAt: new Date('2025-01-07T00:00:00Z'),
		title: 'Комитет по строительству',
		description: 'Комитет по строительству',
		html: '<p>Описание комитета по строительству.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/62e/1579636329_26-p-foni-dlya-proektov-52.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1871',
		slug: 'tourism',
		createdAt: new Date('2025-01-08T00:00:00Z'),
		title: 'Комитет по туризму и гостеприимству',
		description: 'Комитет по туризму и гостеприимству',
		html: '<p>Описание комитета по туризму и гостеприимству.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/0e0/%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%9F%D0%BE%D1%81%D1%82%20%D0%92%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B5%20%D1%81%20%D0%BA%D0%BE%D1%84%D0%B5%D0%B9%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BA%D0%B0%D0%BC%D0%B8.png`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1774',
		slug: 'taxes',
		createdAt: new Date('2025-01-09T00:00:00Z'),
		title: 'Комитет по бюджету, налогам и НМА',
		description: 'Комитет по бюджету, налогам и НМА',
		html: '<p>Описание комитета по бюджету, налогам и НМА.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/237/23732918c10c9d8eda6b9163fbc5f7fe.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '2353',
		slug: 'komitet-po-obrazovaniyu-i-edtech',
		createdAt: new Date('2025-01-10T00:00:00Z'),
		title: 'Комитет по образованию и EDTECH',
		description: 'Комитет по образованию и EDTECH',
		html: '<p>Описание комитета по образованию и EDTECH.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/136/%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%9F%D0%BE%D1%81%D1%82%20%D0%92%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B5%20%D1%81%20%D0%BA%D0%BE%D1%84%D0%B5%D0%B9%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BA%D0%B0%D0%BC%D0%B8%20(2).png`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1925',
		slug: 'komitet-po-sportu',
		createdAt: new Date('2025-01-11T00:00:00Z'),
		title: 'Комитет по спорту',
		description: 'Комитет по спорту',
		html: '<p>Описание комитета по спорту.</p>',
		media: {
			imagesUrl: [`${API_MOCK.domain}/upload/iblock/614/sports3.jpg`],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1904',
		slug: 'export',
		createdAt: new Date('2025-01-12T00:00:00Z'),
		title: 'Комитет по Маркетингу и ВЭД',
		description: 'Комитет по Маркетингу и ВЭД',
		html: '<p>Описание комитета по Маркетингу и ВЭД.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/00b/75dfe1bc5c9cce1e820b0921b956ff04.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1482',
		slug: 'charity',
		createdAt: new Date('2025-01-13T00:00:00Z'),
		title: 'Комитет по благотворительности и социальному предпринимательству',
		description:
			'Комитет по благотворительности и социальному предпринимательству',
		html: '<p>Описание комитета по благотворительности и социальному предпринимательству.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/a56/a561685295192bd8e2442ab621c52ba4.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
	{
		_id: '1775',
		slug: 'komitet-po-razvitiyu-msp',
		createdAt: new Date('2025-01-14T00:00:00Z'),
		title: 'Комитет по развитию МСП',
		description: 'Комитет по развитию МСП',
		html: '<p>Описание комитета по развитию МСП.</p>',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/iblock/451/4511bf76516d34d9f307e8e1fc057816.jpg`,
			],
			videoUrl: [],
		},
		participant: [],
	},
];
