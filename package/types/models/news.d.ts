export interface INews {
	_id: string;
	createdAt: Date;
	media: {
		imagesUrl: string[];
		videoUrl: string[];
	};
	title: string;
	tags: string[];
	html: string; //json content html
	category?: string;
}
