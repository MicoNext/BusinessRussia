'use client';

import {
	cloneElement,
	isValidElement,
	MouseEventHandler,
	ReactNode,
} from 'react';
import { useModalContext } from '../context/ModalContext';

interface ICloseProps {
	asChild?: boolean;
	children: ReactNode;
}

export function Close({ asChild, children }: ICloseProps) {
	const { setOpen } = useModalContext();
	if (asChild && isValidElement<{ onClick?: MouseEventHandler }>(children)) {
		const handleClick: MouseEventHandler = e => {
			children.props.onClick?.(e);
			setOpen(false);
		};
		return cloneElement(children, { onClick: handleClick });
	}
	return (
		<button
			type='button'
			onClick={() => setOpen(false)}
		>
			{children}
		</button>
	);
}
