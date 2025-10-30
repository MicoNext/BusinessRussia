export interface IEvent {
	_id: string;
	createdAt: Date;
	url: string;

	title: string;
	tags: string[];
	html: string;

	startDate: Date;
	endDate?: Date;
	location?: string;
	time?: string;
	category?: string;
}
