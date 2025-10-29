import Link from 'next/link';

function NavItem({ href, label }: { href: string; label: string }) {
	return (
		<li className='flex'>
			<Link
				href={href}
				className='flex items-center text-xl text-brand-grayText hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
			>
				{label}
			</Link>
		</li>
	);
}

export default NavItem;
