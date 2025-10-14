import clsx from 'clsx';
import { IHeadlineProps, Title } from './base';
import {
	composeDescriptionClasses,
	composeSubtitleClasses,
	composeTitleClasses,
} from './base/headlineBase';

export function Headline({
	title,
	titleHtml,
	titleNode,
	subtitle,
	description,
	order = 2,
	variant = 'dark',
	classNames,
	ariaLabel,
	...props
}: IHeadlineProps) {
	return (
		<div
			className={clsx(classNames?.container)}
			aria-label={ariaLabel}
			{...props}
		>
			{subtitle && (
				<span className={composeSubtitleClasses(classNames?.subtitle, variant)}>
					{subtitle}
				</span>
			)}
			<Title
				title={title}
				titleHtml={titleHtml}
				titleNode={titleNode}
				order={order}
				variant={variant}
				classNames={classNames}
			/>
			{description && (
				<p
					className={composeDescriptionClasses(
						classNames?.description,
						variant
					)}
				>
					{description}
				</p>
			)}
		</div>
	);
}
