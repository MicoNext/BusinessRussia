export interface ISliderMain {
	_id: string;
	createdAt: Date;
	type: 'img' | 'video';
	url: string;
	subtitle?: string;
	title: string;
	text?: string;
	tags: string[];
	overlay: boolean;
	sourse?: {
		url: string;
		buttonName: string;
	};
}
