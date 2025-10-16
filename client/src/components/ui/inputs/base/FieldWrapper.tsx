export function FieldWrapper({
	id,
	label,
	required,
	children,
	variant = 'dark',
}: {
	id: string;
	label: string;
	required?: boolean;
	children: React.ReactNode;
	variant?: 'dark' | 'light';
}) {
	const labelColor = variant === 'light' ? 'text-white/90' : 'text-gray-800';
	return (
		<div className='form-group'>
			<label
				htmlFor={id}
				className={`block text-sm font-medium ${labelColor}`}
			>
				{label} {required ? <span className='text-brand-accent'>*</span> : null}
			</label>
			<div className='mt-1'>{children}</div>
		</div>
	);
}
