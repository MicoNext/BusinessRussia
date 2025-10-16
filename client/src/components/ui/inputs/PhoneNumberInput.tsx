import {
	FieldBaseProps,
	FieldWrapper,
	composeInputClasses,
	type InputStyleProps,
} from './base';

export function PhoneNumberInput({
	id,
	label,
	required,
	name,
	placeholder,
	className,
	...styleProps
}: FieldBaseProps & InputStyleProps) {
	return (
		<FieldWrapper
			id={id}
			label={label}
			required={required}
			variant={styleProps.variant}
		>
			<input
				id={id}
				name={name}
				type='tel'
				placeholder={placeholder}
				required={required}
				className={composeInputClasses({ className, ...styleProps })}
			/>
		</FieldWrapper>
	);
}
