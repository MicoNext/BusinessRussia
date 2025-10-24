import { FieldWrapper, composeInputClasses } from './base';
import { InputProps } from './base/inputs.interface';

export function PhoneNumberInput({
	id,
	label,
	required,
	name,
	placeholder,
	className,
	variant,
	size,
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
				type='tel'
				placeholder={placeholder}
				required={required}
				className={composeInputClasses({ className, variant, size })}
				{...rest}
			/>
		</FieldWrapper>
	);
}
