import {
	FieldBaseProps,
	FieldWrapper,
	composeInputClasses,
	type InputStyleProps,
} from './base';

export function TextareaInput({
	id,
	label,
	required,
	name,
	placeholder,
	className,
	variant,
	size,
	...rest
}: FieldBaseProps & InputStyleProps) {
	return (
		<FieldWrapper
			id={id}
			label={label}
			required={required}
			variant={variant}
		>
			<textarea
				id={id}
				name={name}
				rows={4}
				placeholder={placeholder}
				required={required}
				className={composeInputClasses({
					className,
					size: 'textarea',
					variant,
				})}
				{...rest}
			/>
		</FieldWrapper>
	);
}
