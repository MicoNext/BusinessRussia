class Pages {
	HOME = '/';
	NEWS = '/news';

	NEWSSINGLE(id: string) {
		return `${this.NEWS}/${id}`;
	}
}

export const PAGES = new Pages();
