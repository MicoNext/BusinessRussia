export interface MenuItem {
	label: string;
	href?: string;
	children?: MenuItem[];
}

export const MENU: MenuItem[] = [
	{
		label: '«Деловая Россия»',
		href: '/organization/about',
		children: [
			{ label: 'О «Деловой России»', href: '/organization/about' },
			{ label: 'Лица РО', href: '/organization/team' },
		],
	},
	{ label: 'Комитеты', href: '/committees' },
	{ label: 'Мероприятия', href: '/events' },
	{ label: 'Новости', href: '/news' },
	{ label: 'Проекты', href: '/projects' },
	{ label: 'Контакты', href: '/contacts' },
];
