export const ENTITIES = {
	news: { title: 'Новости' },
	events: { title: 'Мероприятия' },
	projects: { title: 'Проекты' },
	organization: { title: '«Деловая Россия»' },
	committees: { title: 'Комитеты' },
} as const;

export type EntitySlug = keyof typeof ENTITIES;
