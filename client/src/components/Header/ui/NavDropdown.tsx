'use client';

import { ChevronDown } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';
import Link from 'next/link';

// function NavDropdown({
// 	label,
// 	children,
// }: {
// 	label: string;
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<li className='relative flex group'>
// 			<button
// 				type='button'
// 				className='text-sm text-brand-grayText hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary inline-flex items-center gap-1'
// 				aria-haspopup='true'
// 				aria-expanded='false'
// 			>
// 				{label}
// 				<ChevronDown className='w-3 h-3 transition-transform duration-200 group-hover:rotate-180' />
// 			</button>
// 			{/* TODO: make it dynamic position depend of current screen width */}
// 			<ul
// 				className='absolute left-0 top-full max-h-96 min-w-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 focus-within:pointer-events-auto transition will-change-transform z-50 p-2'
// 				role='menu'
// 			>
// 				{children}
// 			</ul>
// 		</li>
// 	);
// }
function NavDropdown({
	label,
	children,
	parentHref = '#',
}: {
	label: string;
	children: React.ReactNode;
	parentHref: string;
}) {
	return (
		<Dropdown>
			<Dropdown.Trigger asChild>
				<Link
					href={parentHref}
					className='text-xl text-brand-grayText hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary inline-flex items-center gap-1'
					aria-haspopup='true'
					aria-expanded='false'
				>
					{label}
					<ChevronDown className='w-3 h-3 transition-transform duration-200 group-hover:rotate-180' />
				</Link>
			</Dropdown.Trigger>

			<Dropdown.Content className='p-2'>{children}</Dropdown.Content>
		</Dropdown>
	);
}

export default NavDropdown;
