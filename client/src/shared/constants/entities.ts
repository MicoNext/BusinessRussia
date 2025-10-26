export const ENTITIES = {
	news: { title: 'Новости' },
	events: { title: 'Мероприятия' },
	projects: { title: 'Проекты' },
	organization: { title: '«Деловая Россия»' },
	commissions: { title: 'Комитеты' },
} as const;

export type EntitySlug = keyof typeof ENTITIES;
