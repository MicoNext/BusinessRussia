export interface INews {
	_id: string;
	createdAt: Date;
	slug: string;
	header: {
		title: string;
	};
	media: {
		imagesUrl: string[];
		videoUrl: string[];
	};
	title: string;
	tags: string[];
	html: string; //json content html
	category?: string;
}
