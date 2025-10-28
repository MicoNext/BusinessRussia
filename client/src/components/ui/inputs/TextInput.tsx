import { FieldWrapper, composeInputClasses } from './base';
import { InputProps } from './base/inputs.interface';

export function TextInput({
	id,
	label,
	required,
	name,
	placeholder,
	className,
	variant,
	size,
	disabled,
	...rest
}: InputProps) {
	return (
		<FieldWrapper
			id={id}
			label={label}
			required={required}
			variant={variant}
		>
			<input
				id={id}
				name={name}
				type='text'
				placeholder={placeholder}
				required={required}
				className={composeInputClasses({ className, variant, size })}
				disabled={disabled}
				{...rest}
			/>
		</FieldWrapper>
	);
}
