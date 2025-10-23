import clsx from 'clsx';

interface ISectionBarProps {
	leftSection?: React.ReactNode;
	middleSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	Element?: 'header' | 'div' | 'section' | 'nav';
	className?: string;
	ariaLabel?: string;
}

export function SectionBar({
	leftSection,
	middleSection,
	rightSection,
	Element = 'header',
	className,
	ariaLabel,
}: ISectionBarProps) {
	return (
		<Element
			aria-label={ariaLabel}
			className={clsx(
				'flex items-center justify-between gap-8',
				'flex-wrap gap-y-4',
				className
			)}
		>
			{leftSection && <div className='min-w-0'>{leftSection}</div>}
			{middleSection && <div className='min-w-0'>{middleSection}</div>}
			{rightSection && (
				<div className='flex items-center gap-3'>{rightSection}</div>
			)}
		</Element>
	);
}
