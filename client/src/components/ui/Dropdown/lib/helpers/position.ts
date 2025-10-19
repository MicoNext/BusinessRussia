export type Align = 'left' | 'right';

export function computePosition(args: {
	triggerRect: DOMRect;
	contentEl: HTMLElement;
	offset: number;
	avoidCollisions: boolean;
}): { left: number; top: number; align: Align } {
	const { triggerRect: tRect, contentEl, offset, avoidCollisions } = args;
	let left = tRect.left;
	let top = tRect.bottom + offset;
	let align: Align = 'left';

	const vw = window.innerWidth;
	const cWidth = contentEl.offsetWidth;
	if (avoidCollisions && left + cWidth > vw - 8) {
		left = Math.max(8, vw - 8 - cWidth);
		align = 'right';
	}

	const vh = window.innerHeight;
	const cHeight = contentEl.offsetHeight;
	if (avoidCollisions && top + cHeight > vh - 8) {
		const upTop = tRect.top - offset - cHeight;
		if (upTop >= 8) top = upTop;
	}

	return { left, top, align };
}

export function scheduleRecompute(cb: () => void) {
	let raf: number | null = null;
	const handler = () => {
		if (raf) cancelAnimationFrame(raf);
		raf = requestAnimationFrame(cb);
	};
	window.addEventListener('scroll', handler, true);
	window.addEventListener('resize', handler);
	cb();
	return () => {
		if (raf) cancelAnimationFrame(raf);
		window.removeEventListener('scroll', handler, true);
		window.removeEventListener('resize', handler);
	};
}
