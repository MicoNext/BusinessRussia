import Image from 'next/image';
import { ISliderMain } from '@/../../package/types/models/sliderMain.d';
import clsx from 'clsx';

interface EmblaSlideProps {
	slide: ISliderMain;
}

export const EmblaSlide = ({ slide }: EmblaSlideProps) => {
	const isYouTube = slide.type === 'video' && slide.url.includes('youtube.com');
	const isVideo = slide.type === 'video' && !isYouTube;

	return (
		<div
			className={clsx(
				'embla__slide relative flex-shrink-0 flex-grow-0 basis-full min-w-0',
				'py-8 md:py-12',
				'min-h-[320px] lg:min-h-[540px] xl:min-h-[620px]',
				'flex items-center',
				'rounded-xl shadow-md overflow-hidden'
			)}
		>
			{slide.type === 'img' && (
				<div className='absolute inset-0 -z-0'>
					<Image
						src={slide.url}
						alt={slide.title || 'slide image'}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 100vw'
						priority={false}
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

			<div className='container relative mx-auto px-4 z-20'>
				<div className='max-w-2xl'>
					{slide.subtitle && (
						<div className='text-sm uppercase tracking-wider text-white/80 mb-2'>
							{slide.subtitle}
						</div>
					)}

					<div
						className='text-3xl leading-8 md:text-4xl font-bold text-white mb-4'
						dangerouslySetInnerHTML={{ __html: slide.title }}
					></div>

					{slide.text && (
						<p className='text-lg text-white/90 mb-6'>{slide.text}</p>
					)}
					{slide.sourse && (
						<a
							href={slide.sourse.url}
							className='inline-flex items-center px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 transition'
						>
							{slide.sourse.buttonName}
						</a>
					)}
				</div>
			</div>
		</div>
	);
};
