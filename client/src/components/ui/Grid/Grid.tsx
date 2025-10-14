import React from 'react';
import clsx from 'clsx';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	cols?: 1 | 2 | 3 | 4 | 5 | 6;
	gap?: 0 | 2 | 4 | 6 | 8 | 10 | 12;
}

interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
	span?: 1 | 2 | 3 | 4 | 5 | 6;
}

const colsClassMap: Record<NonNullable<GridProps['cols']>, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-3',
	4: 'grid-cols-4',
	5: 'grid-cols-5',
	6: 'grid-cols-6',
};

const gapClassMap: Record<NonNullable<GridProps['gap']>, string> = {
	0: 'gap-0',
	2: 'gap-2',
	4: 'gap-4',
	6: 'gap-6',
	8: 'gap-8',
	10: 'gap-10',
	12: 'gap-12',
};

const spanClass = (span: number | undefined) => {
	switch (span) {
		case 1:
			return 'col-span-1';
		case 2:
			return 'col-span-2';
		case 3:
			return 'col-span-3';
		case 4:
			return 'col-span-4';
		case 5:
			return 'col-span-5';
		case 6:
			return 'col-span-6';
		default:
			return '';
	}
};

function GridCol({ span, className, children, ...rest }: GridColProps) {
	return (
		<div
			className={clsx(spanClass(span), className)}
			{...rest}
		>
			{children}
		</div>
	);
}

function GridRoot({
	cols = 3,
	gap = 8,
	className,
	children,
	...rest
}: GridProps) {
	const items = React.Children.toArray(children);
	const total = items.length;

	return (
		<div
			className={clsx('grid', colsClassMap[cols], gapClassMap[gap], className)}
			{...rest}
		>
			{items.map((child, index) => {
				if (!React.isValidElement(child)) return child;

				const isFirst = index === 0;
				const isLast = index === total - 1;
				const childProps = child.props as Partial<GridColProps> & {
					className?: string;
				};
				const childSpan: number | undefined = childProps.span;
				const autoSpan = childSpan ?? (isFirst || isLast ? 2 : undefined);

				if (autoSpan !== undefined) {
					return React.cloneElement(child as React.ReactElement<any>, {
						className: clsx(spanClass(autoSpan), childProps.className),
					});
				}
				return child;
			})}
		</div>
	);
}

export const Grid = Object.assign(GridRoot, { Col: GridCol });

export type { GridProps, GridColProps };

export default Grid;
