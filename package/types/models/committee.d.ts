export interface ICommittee {
	_id: string;
	createdAt: Date;
	title: string;
	description: string;
	html: string;
	media: {
		imagesUrl: string[];
		videoUrl: string[];
	};
	participant: string[];
}
