class Pages {
	HOME = '/';
	NEWS = '/news';
	EVENTS = '/events';
	PROJECTS = '/projects';
	CONTACTS = '/contacts';

	SINGLE(category: string, id: string) {
		return `${category}/${id}`;
	}
}

export const PAGES = new Pages();
