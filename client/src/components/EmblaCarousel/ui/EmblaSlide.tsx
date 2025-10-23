import React from 'react';

export const EmblaSlide = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='embla__slide relative flex-shrink-0 flex-grow-0 basis-full min-w-0'>
			{children}
		</div>
	);
};
