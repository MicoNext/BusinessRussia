import { IHeadlineProps } from './headline.interfaces';
import { composeTitleClasses } from './headlineBase';

export function Title({
	title,
	titleHtml,
	titleNode,
	order = 2,
	variant,
	classNames,
}: IHeadlineProps) {
	const Element: React.ElementType = `h${order}`;

	return (
		<>
			{titleNode ? (
				<div className={composeTitleClasses(order, classNames?.title, variant)}>
					{titleNode}
				</div>
			) : titleHtml ? (
				<div
					className={composeTitleClasses(order, classNames?.title, variant)}
					dangerouslySetInnerHTML={{ __html: titleHtml }}
				/>
			) : title ? (
				<Element
					className={composeTitleClasses(order, classNames?.title, variant)}
				>
					{title}
				</Element>
			) : null}
		</>
	);
}
