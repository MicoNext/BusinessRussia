export const modalTokens = {
	container: 'fixed inset-0 flex items-center justify-center p-4 z-[60]',
	panel: 'bg-white rounded-md shadow-xl outline-none',
	animationBase: 'transform transition',
	enter:
		'data-[state=open]:duration-220 data-[state=open]:ease-out data-[state=open]:opacity-100 data-[state=open]:scale-100',
	exit: 'data-[state=closed]:duration-140 data-[state=closed]:ease-in data-[state=closed]:opacity-0 data-[state=closed]:scale-95',
} as const;
