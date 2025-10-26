import type { IParticipant } from '@/../../package/types/models/participant';
import { API_MOCK } from './api.mock';

const mockHtmlContent = `<div class="text text_modify">
               
                                        Председатель экспертного совета регионального фонда развития промышленности Пермского края,&nbsp;депутат Краснокамской городской думы, основатель Пермского кластера сельхозмашиностроения,&nbsp;лидер по экспертной активности в СМИ среди предпринимателей региона.<br>
<p>
	 Окончил Пермский госуниверситет по специальности «Менеджмент».
</p>
<p>
	 В декабре 2001 года возглавил Краснокамский ремонтно-механический завод . В 2009-2010 годах занимал должность министра промышленности, науки и инноваций Пермского края. В 2010 году вернулся на Краснокамский РМЗ. Предприятие производит несколько видов продукции:
</p>
<p>
</p>
<ul>
	<li><a href="https://senazh.online/" target="_blank">Кормозаготовительную технику</a></li>
	<li><a href="https://expedition-pricep.ru/" target="_blank" style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Прицепы для легковых автомобилей под брендом «Экспедиция»</a></li>
	<li><a href="http://frontlift.ru/" target="_blank" style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">Фронтальный погрузчик Frontlift и рабочие органы</a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</li>
	<li><a href="http://%20https%20:/%20/%20st%20l%20-%20rus%20.%20com%20/" target="_blank" style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">складское оборудование STL</a></li>
</ul>
<p>
</p>
<p>
	 В 2012 году Дмитрий Теплов получил степень MBA в университете г. Луисвиль (США).
</p>
<p>
 <b>Дмитрий Теплов активно участвует в развитии предпринимательства в регионе. Одновременно он является:</b>
</p>
<p>
</p>
<ul>
	<li>председателем Совета пермского регионального отделения общероссийской общественной организации «Деловая Россия»</li>
	<li>председателем экспертного совета <a href="https://frpperm.ru/" target="_blank" style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">регионального фонда развития промышленности Пермского края</a>&nbsp;</li>
	<li><a href="https://frpperm.ru/klastery/promyshlennyy-klaster-selskohozyaystvennogo-%20mashinostroeniya/" target="_blank" style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">основателем Пермского кластера сельхозмашиностроения</a></li>
	<li><a href="http://www.psu.ru/universitet/endowment-psu/struktura-fonda/popechitelskij-sovet" target="_blank" style="font-family: var(--ui-font-family-primary, var(--ui-font-family-helvetica));">председателем Попечительского совета Фонда целевого капитала ПГНИУ</a>&nbsp;</li>
	<li>председателем Территориального объединения работодателей Краснокамского района «Совет директоров»&nbsp;</li>
</ul>
<p>
</p>
<p>
 <b>Организационная деятельность:</b>
</p>
<p>
	 С 2010 года член регионального отделения общественной организации «Деловая Россия».
</p>
<p>
	 С 2012 года руководитель экспертной группы по внедрению Стандарта деятельности органов исполнительной власти субъекта РФ по обеспечению благоприятного инвестиционного климата в регионе.
</p>
<p>
	 С 2012 года председатель территориального объединения работодателей Краснокамского района Пермского края.
</p>
<p>
	 С 2012 года советник руководителя Агентства по инвестициям и внешнеэкономическим связям Пермского края.
</p>
<p>
	 С 2016 года председатель экспертного Совета регионального Фонда развития промышленности.
</p>
<p>
</p>
<p>
	 С 2016 года председатель общественного Совета уполномоченного по защите прав предпринимателей Пермского края.&nbsp;
</p>
<p>
	 В сентябре 2018 года Дмитрий Теплов был избран депутатом <a href="http://krasnokamsk.ru/Organy-vlasti/Gorodskaja-Duma" target="_blank">Краснокамской городской думы</a>.
</p>
<p>
 <br>
</p>
 <br>
 <br>                                    </div>`;

export const participantsMock: IParticipant[] = [
	{
		_id: '27',
		createdAt: new Date('2025-01-21T00:00:00Z'),
		name: 'Дмитрий Теплов',
		jobTitle: 'Председатель отделения',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/04d/dsf4qzyrip2caew77zx0jikbz8rqfyh0/560_10000_0/photo_2025-01-21_14-50-39.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'manager',
	},
	{
		_id: '235',
		createdAt: new Date('2025-01-20T00:00:00Z'),
		name: 'Евгений Протопопов',
		jobTitle: 'Сопредседатель отделения',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/847/560_10000_0/%D0%A7%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%20%D1%81%20%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%BC%20%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20%D0%B2%20Instagram%20%D1%81%20%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B5%D0%B9%20%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B8%20%D1%81%20%D0%BA%D0%BE%D1%81%D0%BE%D0%B9%20%D0%B8%20%D0%BC%D0%B0%D0%BA%D0%B8%D1%8F%D0%B6%D0%B5%D0%BC%20(33).png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'manager',
	},
	{
		_id: '1806',
		createdAt: new Date('2025-01-19T00:00:00Z'),
		name: 'Ирина Жданова',
		jobTitle: 'Исполнительный директор отделения',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/66d/560_10000_0/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D0%B1%D0%B5%D0%B7%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20(3).jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'manager',
	},
	{
		_id: '3463',
		createdAt: new Date('2025-01-18T00:00:00Z'),
		name: 'Алексей Нестеров',
		jobTitle: 'Руководитель проектов',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/ee5/f6q3culs312gwdwad3k19undqudz65zd/560_10000_0/iuiip.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '4900',
		createdAt: new Date('2025-01-17T00:00:00Z'),
		name: 'Светлана Кузнецова',
		jobTitle: 'Организатор мероприятий',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/0e8/xavcuvwloz9lc62rgt64wgtf2yt7wqwm/560_10000_0/fdsfdsjdd.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '1795',
		createdAt: new Date('2025-01-16T00:00:00Z'),
		name: 'Андрей Колесников',
		jobTitle: 'Почетный член ДР',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/cdd/560_10000_0/iuuu.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '2700',
		createdAt: new Date('2025-01-15T00:00:00Z'),
		name: 'Александр Капитонов',
		jobTitle: 'Член регионального совета',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/73b/560_10000_0/%D0%A4%D0%BE%D1%82%D0%BE_%D0%9A%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BD%D0%BE%D0%B2%20%D0%90.%D0%92.%20(1).jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'boardMember',
	},
	{
		_id: '3310',
		createdAt: new Date('2025-01-14T00:00:00Z'),
		name: 'Евгений Струков',
		jobTitle: 'Член регионального совета',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/417/560_10000_0/strykov.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'boardMember',
	},
	{
		_id: '3839',
		createdAt: new Date('2025-02-07T00:00:00Z'),
		name: 'Алексей Балыко',
		jobTitle: 'Член регионального совета',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/a0c/z08lhjlr4tsin4r09ey9r0ibzfkn07co/560_10000_0/image_2025-02-07_12-33-58.png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'boardMember',
	},
	{
		_id: '4714',
		createdAt: new Date('2025-03-12T00:00:00Z'),
		name: 'Наталья Саранская',
		jobTitle: 'Член регионального совета',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/a70/9ab5nie86xidu63y560f3psxnezls2uh/560_10000_0/image_2025-03-12_10-24-24.png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'boardMember',
	},
	{
		_id: '4763',
		createdAt: new Date('2025-02-06T00:00:00Z'),
		name: 'Екатерина Айрих',
		jobTitle: 'Член регионального совета',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/e2f/bhh1g4fyv6663p66s39rgqgdy6ez0x9p/560_10000_0/image_2025-02-06_15-17-47.png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'boardMember',
	},
	{
		_id: '244',
		createdAt: new Date('2025-01-10T00:00:00Z'),
		name: 'Егор Чурин',
		jobTitle: 'Лидер комитета по бюджету, налогам и НМА',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/1c2/560_10000_0/Instagram-%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%201080x1080%20%20%D0%BF%D0%B8%D0%BA%D1%81%20(93).png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'boardMember',
	},
	{
		_id: '236',
		createdAt: new Date('2025-01-09T00:00:00Z'),
		name: 'Алексей Павлов',
		jobTitle: 'Член ДР',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/464/mjb6md7jigl0bzyu6rbqu4vwojm2brvc/560_10000_0/tuhdyh.png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '242',
		createdAt: new Date('2025-01-08T00:00:00Z'),
		name: 'Олег Хурматуллин',
		jobTitle: 'Член ДР',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/bed/560_10000_0/jk.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '1447',
		createdAt: new Date('2025-01-07T00:00:00Z'),
		name: 'Сергей Патрушев',
		jobTitle: 'Член ДР',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/23e/560_10000_0/jkj.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '258',
		createdAt: new Date('2025-01-06T00:00:00Z'),
		name: 'Александр Редекоп',
		jobTitle: 'Член ДР',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/1f7/560_10000_0/1f7b8843bc60addf37ecc4ffdcd1fcfd.png`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
	{
		_id: '4820',
		createdAt: new Date('2025-01-05T00:00:00Z'),
		name: 'Яков Бобриков',
		jobTitle: 'Член ДР',
		media: {
			imagesUrl: [
				`${API_MOCK.domain}/upload/resize_cache/iblock/bdf/560_10000_0/sree.jpg`,
			],
			videoUrl: [],
		},
		html: mockHtmlContent,
		role: 'invited',
	},
];
