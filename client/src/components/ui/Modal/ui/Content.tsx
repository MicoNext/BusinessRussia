import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Portal } from '@/shared/lib/hooks';
import { useModalContext } from '../context/ModalContext';
import { modalTokens } from '../base/modal.tokens';
import { usePresence } from '@/shared/lib/hooks/usePresence';
import { Overlay } from '@/components/ui/Overlay';

interface IContentProps {
	className?: string;
	children: ReactNode;
	centered?: boolean;
	classNames?: {
		container?: string;
		panel?: string;
	};
}

export function Content({
	className,
	children,
	classNames,
	centered = true,
}: IContentProps) {
	const { open, setOpen, contentRef } = useModalContext();
	const { present, setPresent, entered } = usePresence(open);

	if (!present) return null;

	const containerClasses = clsx(
		modalTokens.container,
		modalTokens.containerAnimationBase,
		modalTokens.containerEnter,
		modalTokens.containerExit,
		centered && modalTokens.centered,
		open && !entered && 'opacity-0',
		classNames?.container
	);

	const panelClasses = clsx(
		modalTokens.panel,
		modalTokens.contentAnimationBase,
		modalTokens.contentEnter,
		modalTokens.contentExit,
		open && !entered && 'translate-y-1',
		classNames?.panel,
		className
	);

	return (
		<Portal>
			<div
				className={containerClasses}
				data-state={open ? 'open' : 'closed'}
			>
				<Overlay onClick={() => setOpen(false)} />
				<div
					role='dialog'
					aria-modal='true'
					data-state={open ? 'open' : 'closed'}
					tabIndex={-1}
					ref={node => {
						contentRef.current = node instanceof HTMLElement ? node : null;
					}}
					onTransitionEnd={() => {
						if (!open) setPresent(false);
					}}
					className={panelClasses}
				>
					{children}
				</div>
			</div>
		</Portal>
	);
}
