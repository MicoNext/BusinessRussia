import { ISliderMain } from '@/../../package/types/models/sliderMain.d';
import clsx from 'clsx';
import { Headline } from '@/components/ui/Headline';

export function HeroSlide({ slide }: { slide: ISliderMain }) {
	const isYouTube = slide.type === 'video' && slide.url.includes('youtube.com');
	const isVideo = slide.type === 'video' && !isYouTube;

	return (
		<div
			className={clsx(
				'embla__slide relative flex-shrink-0 flex-grow-0 basis-full min-w-0',
				'py-14',
				'min-h-[320px] lg:min-h-[540px] xl:min-h-[620px] 2xl:min-h-[720px]',
				'flex items-center'
			)}
		>
			{slide.type === 'img' && (
				<div className='absolute inset-0 -z-0'>
					<img
						src={slide.url}
						alt={slide.title || 'slide image'}
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 100vw'
					/>
				</div>
			)}

			{isYouTube && (
				<iframe
					className='absolute inset-0 w-full h-full -z-0'
					src={slide.url}
					title={slide.title}
					allowFullScreen={true}
					allow='accelerometer; autoplay; encrypted-media; gyroscope; fullscreen;'
				/>
			)}

			{isVideo && (
				<video
					className='absolute inset-0 w-full h-full object-cover -z-0'
					autoPlay
					loop
					muted
					playsInline
				>
					<source
						src={slide.url}
						type='video/mp4'
					/>
				</video>
			)}

			{slide.overlay && <div className='absolute inset-0 bg-black/50 z-10' />}

			<div className='relative px-4 md:px-8 lg:px-12 z-20 w-full'>
				<div className='container mx-auto'>
					<div className='max-w-2xl'>
						<Headline
							titleHtml={slide.title}
							subtitle={slide.subtitle}
							description={slide.text}
							variant='light'
							classNames={{ container: 'text-white flex flex-col gap-4 mb-6' }}
						/>
						{slide.sourse && (
							<a
								href={slide.sourse.url || '#'}
								className='inline-flex items-center px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 transition'
							>
								{slide.sourse.buttonName}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
