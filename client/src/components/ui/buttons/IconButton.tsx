import { composeClasses, IIconButtonProps } from './base';

export function IconButton({
	icon,
	className,
	size = 'md',
	disabled,
	...rest
}: IIconButtonProps) {
	const classes = composeClasses({
		className,
		size,
		variant: 'circle',
		fullWidth: false,
	});

	return (
		<button
			type='button'
			className={classes}
			disabled={disabled}
			{...rest}
		>
			{icon}
		</button>
	);
}
