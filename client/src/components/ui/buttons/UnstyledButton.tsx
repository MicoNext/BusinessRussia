import React from 'react';
import { IUnstyledButtonProps } from './base/buttons.interfaces';

export function UnstyledButton({
	children,
	rightSection,
	leftSection,
	classNames,
	...props
}: IUnstyledButtonProps) {
	return (
		<button
			className={classNames?.container}
			{...props}
		>
			{leftSection && (
				<span className={classNames?.leftSection}>{leftSection}</span>
			)}
			<span className={classNames?.content}>{children}</span>
			{rightSection && (
				<span className={classNames?.rightSection}>{rightSection}</span>
			)}
		</button>
	);
}
