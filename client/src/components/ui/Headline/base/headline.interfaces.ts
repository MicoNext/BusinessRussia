export interface IHeadlineProps {
	title?: string;
	titleHtml?: string; // when title contains HTML
	titleNode?: React.ReactNode; // fully custom title node
	subtitle?: string;
	description?: string;
	order?: 1 | 2 | 3 | 4 | 5 | 6;
	variant?: 'light' | 'dark';
	classNames?: {
		container?: string;
		title?: string;
		subtitle?: string;
		description?: string;
	};
	ariaLabel?: string;
}
