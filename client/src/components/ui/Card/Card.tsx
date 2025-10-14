import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Headline } from '@/components/ui/Headline';

interface ICardProps {
	link: string;
	image?: string;
	subtitle?: string;
	title?: string;
	time?: string | Date;
}

export function Card({ link, image, subtitle, title, time }: ICardProps) {
	return (
		<article className='relative flex flex-col  border rounded-lg overflow-hidden h-full bg-white hover:shadow-md hover:translate-y-[-2px] transition-all duration-300'>
			<figure className='relative aspect-[4/3]'>
				<Link
					href={link}
					aria-label={title}
				>
					{image && (
						<Image
							src={image}
							alt={title || 'изображение'}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 50vw, 33vw'
						/>
					)}
				</Link>
			</figure>
			<div className='p-4 flex flex-col justify-between gap-2 flex-1'>
				<Headline
					subtitle={subtitle}
					titleNode={
						<h3 className='text-sm font-medium leading-5'>
							<Link
								href={link}
								className='text-gray-900 hover:text-brand-primary'
								dangerouslySetInnerHTML={{ __html: title || '' }}
							/>
						</h3>
					}
					order={3}
					classNames={{
						subtitle: 'text-xs tracking-wide text-brand-primary',
						title: 'text-sm font-medium leading-5',
					}}
				/>

				{time && (
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
				)}
			</div>
		</article>
	);
}
