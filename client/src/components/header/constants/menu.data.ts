export interface MenuLink {
	label: string;
	href: string;
}

export interface MenuItem {
	label: string;
	href?: string;
	children?: MenuLink[];
}

export const MENU: MenuItem[] = [
	{ label: 'Книга', href: '/projects/154' },
	{
		label: '«Деловая Россия»',
		children: [
			{ label: 'О «Деловой России»', href: '/organization/about' },
			{ label: 'Лица РО', href: '/organization/team' },
			{ label: 'Эксперты', href: '/organization/experts' },
			{ label: 'Возможности', href: '/services' },
			{ label: 'Как стать членом', href: '/organization/how-to-join' },
			{
				label: '«Деловая Россия» в Пермском крае',
				href: '/organization/perm-region',
			},
			{ label: 'Комитеты', href: '/commissions' },
			{ label: 'Клубы', href: '/clubs' },
			{ label: 'Советы и рабочие группы', href: '/boards' },
			{ label: 'Партнеры', href: '/organization/partners' },
			{ label: 'Документы', href: '/organization/docs' },
			{ label: 'Реквизиты', href: '/organization/requisites' },
		],
	},
	{ label: 'Мероприятия', href: '/events' },
	{ label: 'Новости', href: '/news' },
	{
		label: 'Проекты',
		children: [
			{ label: 'Альянс проверенных подрядчиков', href: '/projects/139' },
			{ label: 'Региональный инвестиционный стандарт', href: '/projects/149' },
			{ label: 'Клуб инноваторов', href: '/projects/158' },
			{
				label: 'Клуб экспортеров «Деловой России» Export Experience Club',
				href: '/projects/156',
			},
			{
				label: 'Книга «Предприниматели и меценаты Прикамья»',
				href: '/projects/154',
			},
			{ label: 'Деньги для Дела', href: '/projects/120' },
			{
				label: 'Краудфандинговая платформа #ПермьВдохновляет',
				href: '/projects/137',
			},
			{ label: 'Проект «Азбука.Пермь-300»', href: '/projects/150' },
			{
				label: 'Центр компетенций по грантам и субсидиям',
				href: '/projects/144',
			},
			{ label: 'Кадровый резерв ДРПК', href: '/projects/147' },
			{
				label: 'Центр компетенций технического заказчика',
				href: '/projects/148',
			},
			{ label: '«В гости по-деловому»', href: '/projects/151' },
			{ label: 'Бизнес-завтрак с экспертом', href: '/projects/152' },
			{ label: 'Deloros Talks', href: '/projects/153' },
			{ label: 'Гид инвестора', href: '/projects/155' },
			{ label: 'Проект «I love school»', href: '/projects/83' },
		],
	},
	{ label: 'Контакты', href: '/contacts' },
];
