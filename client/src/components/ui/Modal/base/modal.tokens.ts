export const modalTokens = {
	container: 'fixed inset-0 flex justify-center p-4 z-[60]',
	centered: 'items-center justify-center',
	containerAnimationBase: 'transition-opacity',
	containerEnter:
		'data-[state=open]:duration-100 data-[state=open]:ease-in data-[state=open]:opacity-1',
	containerExit:
		'data-[state=closed]:duration-150 data-[state=closed]:ease-in data-[state=closed]:opacity-0',

	panel: 'bg-white rounded-md shadow-xl outline-none',
	contentAnimationBase: 'transform transition',
	contentEnter:
		'data-[state=open]:duration-100 data-[state=open]:ease-in data-[state=open]:translate-y-0',
	contentExit:
		'data-[state=closed]:duration-150 data-[state=closed]:ease-in data-[state=closed]:translate-y-3',
} as const;
