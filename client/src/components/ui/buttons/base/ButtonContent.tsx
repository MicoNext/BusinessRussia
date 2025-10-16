import type React from 'react';

export function ButtonSection({ children }: { children: React.ReactNode }) {
	return <span className='inline-flex items-center'>{children}</span>;
}

export function ButtonContent({
	children,
	leftSection,
	rightSection,
}: {
	children: React.ReactNode;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
}) {
	return (
		<>
			{leftSection && <ButtonSection>{leftSection}</ButtonSection>}
			<ButtonSection>{children}</ButtonSection>
			{rightSection && <ButtonSection>{rightSection}</ButtonSection>}
		</>
	);
}
