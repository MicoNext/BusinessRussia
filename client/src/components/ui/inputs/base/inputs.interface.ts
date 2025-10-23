export type InputVariant = 'dark' | 'light';
export type InputSize = 'sm' | 'md' | 'lg';

export interface FieldBaseProps {
	id: string;
	label: string;
	required?: boolean;
	name: string;
	placeholder?: string;
	className?: string;
}

export interface InputStyleProps {
	variant?: InputVariant;
	size?: InputSize;
	className?: string;
}
