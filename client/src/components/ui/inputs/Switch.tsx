export function Switch({
	id,
	name,
	label,
	required,
	variant = 'dark',
	className,
	checked,
	defaultChecked,
	onChange,
	disabled,
}: {
	id: string;
	name: string;
	label?: string | React.ReactNode;
	required?: boolean;
	variant?: 'dark' | 'light';
	className?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}) {
	const labelColor = variant === 'light' ? 'text-white/90' : 'text-gray-800';
	const offTrackColor = variant === 'light' ? 'bg-white/30' : 'bg-gray-300';
	const focusRing =
		variant === 'light'
			? 'peer-focus-visible:ring-2 peer-focus-visible:ring-white/60'
			: 'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary';

	return (
		<div
			className={`flex items-center ${disabled ? 'opacity-60' : ''} ${
				className ?? ''
			}`}
		>
			<label
				htmlFor={id}
				className={`inline-flex items-center gap-3 cursor-pointer select-none ${
					disabled ? 'cursor-not-allowed' : ''
				}`}
			>
				<input
					id={id}
					name={name}
					type='checkbox'
					required={required}
					className='sr-only peer'
					checked={checked}
					defaultChecked={defaultChecked}
					onChange={onChange}
					disabled={disabled}
				/>
				<span
					aria-hidden='true'
					className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${offTrackColor} peer-checked:bg-brand-primary peer-checked:[&>span]:translate-x-5 ${focusRing}`}
				>
					<span className='absolute left-0.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out' />
				</span>
				{label && <span className={`text-sm ${labelColor}`}>{label}</span>}
			</label>
		</div>
	);
}
