export function Switch({
	id,
	name,
	label,
	required,
	variant = 'dark',
}: {
	id: string;
	name: string;
	label?: string | React.ReactNode;
	required?: boolean;
	variant?: 'dark' | 'light';
}) {
	const labelColor = variant === 'light' ? 'text-white/90' : 'text-gray-800';
	const boxColor =
		variant === 'light'
			? 'border-white/30 text-white focus:ring-white/60'
			: 'border-gray-300 text-brand-primary focus:ring-brand-primary';

	return (
		<div className='flex items-center gap-3'>
			<input
				id={id}
				name={name}
				type='checkbox'
				required={required}
				className={`h-4 w-4 rounded ${boxColor}`}
			/>
			{label && (
				<label
					htmlFor={id}
					className={`text-sm ${labelColor}`}
				>
					{label}
				</label>
			)}
		</div>
	);
}
