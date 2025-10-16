import clsx from 'clsx';

interface СontactusCardProps {
	href: string;
	icon: React.ReactNode;
	title: string;
	classNames?: {
		container?: string;
		icon?: string;
	};
}

export function СontactusCard({
	href,
	icon,
	title,
	classNames,
}: СontactusCardProps) {
	return (
		<a
			href={href}
			className={clsx('flex flex-col', classNames?.container)}
		>
			<span className={clsx(classNames?.icon, 'text-nowrap')}>{icon}</span>
			<span className={clsx('text-nowrap')}>{title}</span>
		</a>
	);
}
