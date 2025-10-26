export interface MenuItem {
	label: string;
	href?: string;
	children?: MenuItem[];
}

export const MENU: MenuItem[] = [
	{
		label: '«Деловая Россия»',
		href: '/organization',
		children: [
			{ label: 'О «Деловой России»', href: '/organization/about' },
			{ label: 'Лица РО', href: '/organization/team' },
			{ label: 'Комитеты', href: '/commissions' },
		],
	},
	{ label: 'Мероприятия', href: '/events' },
	{ label: 'Новости', href: '/news' },
	{
		label: 'Проекты',
		href: '/projects',
		children: [
			{ label: 'Альянс проверенных подрядчиков', href: '/projects/139' },
			{ label: 'Региональный инвестиционный стандарт', href: '/projects/149' },
			{ label: 'Клуб инноваторов', href: '/projects/158' },
			{
				label: 'Клуб экспортеров «Деловой России» Export Experience Club',
				href: '/projects/156',
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
