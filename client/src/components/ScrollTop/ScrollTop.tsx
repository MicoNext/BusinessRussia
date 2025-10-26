'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { IconButton } from '../ui/buttons';

export function ScrollTop({
	threshold = 200,
	className,
}: {
	threshold?: number;
	className?: string;
}) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > threshold);
		};
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [threshold]);

	const handleScrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<IconButton
			component='button'
			icon={<ArrowUp className='w-5 h-5' />}
			aria-label='Прокрутить вверх'
			onClick={handleScrollTop}
			className={`flex items-center justify-center fixed bottom-6 right-6 z-50 transition-all duration-200 ${
				isVisible
					? 'opacity-100 translate-y-0 pointer-events-auto'
					: 'opacity-0 translate-y-2 pointer-events-none'
			} ${className ?? ''}`}
		/>
	);
}
