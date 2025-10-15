import { ButtonContent, composeClasses } from './base';
import type { IButtonProps } from './base';

export function Button({
	children,
	className,
	size,
	variant,
	fullWidth,
	leftSection,
	rightSection,
	...rest
}: IButtonProps) {
	const classes = composeClasses({ className, size, variant, fullWidth });
	return (
		<button
			{...rest}
			className={classes}
		>
			<ButtonContent
				leftSection={leftSection}
				rightSection={rightSection}
			>
				{children}
			</ButtonContent>
		</button>
	);
}
