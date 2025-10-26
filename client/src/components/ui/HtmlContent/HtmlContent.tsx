import classes from './styles.module.css';

interface HtmlContentProps {
	html: string;
}

export function HtmlContent({ html }: HtmlContentProps) {
	return (
		<div
			className={classes['html-content']}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
