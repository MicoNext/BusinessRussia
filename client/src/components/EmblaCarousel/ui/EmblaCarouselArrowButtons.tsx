import React, { ComponentPropsWithRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons';

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = props => {
	const { children, className, ...restProps } = props;

	return (
		<IconButton
			icon={<ChevronLeft className='w-6 h-6' />}
			aria-label='Предыдущий слайд'
			{...restProps}
			className={className}
		>
			{children}
		</IconButton>
	);
};

export const NextButton: React.FC<PropType> = props => {
	const { children, className, ...restProps } = props;

	return (
		<IconButton
			icon={<ChevronRight className='w-6 h-6' />}
			aria-label='Следующий слайд'
			{...restProps}
			className={className}
		>
			{children}
		</IconButton>
	);
};
