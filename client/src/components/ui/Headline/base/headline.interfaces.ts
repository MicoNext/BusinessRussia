export interface IHeadlineProps {
	title?: string;
	titleHtml?: string;
	titleNode?: React.ReactNode;
	subtitle?: React.ReactNode;
	description?: React.ReactNode;
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
