import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Portal } from '@/shared/lib/hooks';
import { Overlay } from '@/components/ui/Overlay/Overlay';
import { useModalContext } from '../context/ModalContext';
import { modalTokens } from '../base/modal.tokens';

interface IContentProps {
	className?: string;
	children: ReactNode;
}

export function Content({ className, children }: IContentProps) {
	const { open, setOpen, contentRef } = useModalContext();
	if (!open) return null;

	const panelClasses = clsx(
		modalTokens.panel,
		modalTokens.animationBase,
		modalTokens.enter,
		modalTokens.exit,
		className
	);

	return (
		<Portal>
			<div className={modalTokens.container}>
				<Overlay
					open={open}
					onClick={() => setOpen(false)}
					className=''
				/>
				<div
					role='dialog'
					aria-modal='true'
					data-state={open ? 'open' : 'closed'}
					tabIndex={-1}
					ref={node => {
						contentRef.current = node instanceof HTMLElement ? node : null;
					}}
					className={panelClasses}
				>
					{children}
				</div>
			</div>
		</Portal>
	);
}
