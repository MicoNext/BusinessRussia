import { composeClasses, IIconButtonProps } from './base';

export function IconButton({
	component: Component = 'button',
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
		<Component
			className={classes}
			disabled={disabled}
			{...rest}
		>
			{icon}
		</Component>
	);
}
