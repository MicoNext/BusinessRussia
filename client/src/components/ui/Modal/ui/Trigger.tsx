import {
	cloneElement,
	isValidElement,
	MouseEventHandler,
	ReactNode,
} from 'react';
import { useModalContext } from '../context/ModalContext';

interface ITriggerProps {
	asChild?: boolean;
	children: ReactNode;
}

export function Trigger({ asChild, children }: ITriggerProps) {
	const {
		setOpen,
		openDelay,
		closeDelay,
		triggerRef,
		openTimerRef,
		closeTimerRef,
	} = useModalContext();

	const handleClick = (e: React.MouseEvent<Element>) => {
		const target = e.currentTarget;
		if (target instanceof HTMLElement) triggerRef.current = target;
		if (closeTimerRef.current != null)
			window.clearTimeout(closeTimerRef.current);
		openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
	};

	if (
		asChild &&
		isValidElement<{
			onClick?: MouseEventHandler;
		}>(children)
	) {
		return cloneElement(children, {
			onClick: e => {
				children.props.onClick?.(e);
				handleClick(e);
			},
		});
	}

	return (
		<button
			type='button'
			onClick={handleClick}
		>
			{children}
		</button>
	);
}
