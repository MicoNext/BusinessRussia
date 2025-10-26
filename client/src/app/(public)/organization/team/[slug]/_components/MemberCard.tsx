import Image from 'next/image';

interface IMemberCardProps {
	image?: string;
	info?: IMemberInfo;
}

interface IMemberInfo {
	jobTitle?: string;
}

export function MemberCard({ image, info }: IMemberCardProps) {
	return (
		<section className='flex flex-col sm:flex-row gap-4'>
			{image && (
				<figure className='relative w-full sm:w-64 aspect-[4/5] overflow-hidden rounded-xl bg-gray-100'>
					<Image
						src={image}
						alt={info?.jobTitle || 'Фото участника'}
						fill
						className='object-cover'
						sizes='(max-width: 640px) 100vw, 256px'
					/>
				</figure>
			)}
			<div className='flex-1 min-w-[240px]'>
				<ul className='text-sm text-gray-700 space-y-1'>
					{info?.jobTitle && (
						<li>
							<span className='text-gray-500'>Должность: </span>
							<span className='font-medium text-gray-900'>{info.jobTitle}</span>
						</li>
					)}
				</ul>
			</div>
		</section>
	);
}
