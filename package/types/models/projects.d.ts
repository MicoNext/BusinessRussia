export interface IProject {
	_id: string;
	createdAt: Date;
	slug: string;
	url: string;
	media: {
		imagesUrl: string[];
		videoUrl: string[];
	};
	title: string;
	tags: string[];
	html: string;
	category?: string;
	isBig?: boolean;
}
