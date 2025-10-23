export const dropdownTokens = {
	maxHeight: 'max-h-96',
	maxWidth: 'max-w-64',
	container:
		'overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg p-2',
	animationBase: 'transform transition',
	enter:
		'data-[state=open]:duration-140 data-[state=open]:ease-in data-[state=open]:opacity-1 data-[state=open]:translate-y-0',
	exit: 'data-[state=closed]:duration-140 data-[state=closed]:ease-in data-[state=closed]:opacity-0 data-[state=closed]:translate-y-1',
} as const;
