import { IconButton } from '@/components/ui/buttons';
import clsx from 'clsx';

interface SocialMediaProps {
	items: {
		icon: React.ReactNode;
		href: string;
	}[];
	className?: string;
}

export function SocialMedia({ items, className }: SocialMediaProps) {
	return (
		<div className={clsx('flex gap-1', className)}>
			{items.map(item => (
				<IconButton
					key={item.href}
					component='a'
					icon={item.icon}
					className={clsx(
						'items-center justify-center rounded-md w-8 h-8',
						'hover:rounded-full transition-all duration-300'
					)}
					href={item.href}
				/>
			))}
		</div>
	);
}
