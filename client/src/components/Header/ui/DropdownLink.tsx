import Link from 'next/link';

function DropdownLink({ href = '#', label }: { href?: string; label: string }) {
	return (
		<li>
			<Link
				href={href}
				className='block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
				role='menuitem'
			>
				{label}
			</Link>
		</li>
	);
}

export default DropdownLink;
