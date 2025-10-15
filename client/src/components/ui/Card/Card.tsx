import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Headline } from '@/components/ui/Headline';
import clsx from 'clsx';
import { Badge } from '@/components/ui/Badge';

interface ICardProps {
	link: string;
	image?: string;
	subtitle?: string;
	title?: string;
	time?: string | Date;
	direction?: 'column' | 'row';
	classNames?: {
		container?: string;
		image?: string;
		title?: string;
		subtitle?: string;
		time?: string;
		textbox?: string;
	};
}

export function Card({
	link,
	image,
	subtitle,
	title,
	time,
	direction = 'column',
	classNames,
}: ICardProps) {
	const isRow = direction === 'row';
	return (
		<article
			className={clsx(
				`relative flex ${
					isRow ? 'flex-row' : 'flex-col'
				} border rounded-2xl overflow-hidden h-full bg-neutral-50 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300`,
				classNames?.container
			)}
		>
			<figure
				className={clsx(
					isRow ? 'relative w-1/2 min-h-[180px]' : 'relative aspect-[4/3]',
					classNames?.image
				)}
			>
				<Link
					href={link}
					aria-label={title}
				>
					{image && (
						<Image
							src={image}
							alt={title || 'изображение'}
							fill
							className='object-cover rounded-2xl'
							sizes={'(max-width: 768px) 50vw, 33vw'}
						/>
					)}
				</Link>
			</figure>
			<div
				className={clsx(
					`p-4 md:p-7 flex flex-col items-start justify-between gap-2 flex-1`,
					classNames?.textbox
				)}
			>
				<Headline
					subtitle={subtitle}
					titleNode={
						<h3
							className={clsx(
								'text-lg font-medium leading-snug line-clamp-2',
								classNames?.title
							)}
						>
							<Link
								href={link}
								className='text-gray-900 hover:text-brand-primary'
								dangerouslySetInnerHTML={{ __html: title || '' }}
							/>
						</h3>
					}
					order={3}
					ariaLabel={title}
					classNames={{
						container: clsx('flex flex-col gap-2'),
						subtitle: clsx(
							'text-xs tracking-wide text-brand-primary',
							classNames?.subtitle
						),
						title: clsx('text-sm font-medium leading-5'),
					}}
				/>

				{time && (
					<Badge
						size='sm'
						radius='sm'
					>
						<time
							dateTime={new Date(time).toISOString()}
							className='text-xs text-gray-500'
						>
							{new Date(time).toLocaleDateString('ru-RU', {
								day: '2-digit',
								month: 'long',
								year: 'numeric',
							})}
						</time>
					</Badge>
				)}
			</div>
		</article>
	);
}
