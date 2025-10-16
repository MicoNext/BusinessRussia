'use client';

import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/buttons';
import { MENU } from '../constants/menu.data';
import NavItem from './NavItem';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export function HeaderSidebar() {
	return (
		<Sidebar initialOpen={false}>
			<Sidebar.Trigger asChild>
				<Button variant='ghost'>
					<Menu
						size={24}
						strokeWidth={1}
					/>
				</Button>
			</Sidebar.Trigger>

			<Sidebar.Portal>
				<Sidebar.Overlay />
				<Sidebar.Content
					side='left'
					size='md'
					className='flex flex-col'
				>
					<Sidebar.Header>
						<div className='flex items-center justify-between'>
							<Logo />
							<Sidebar.Close asChild>
								<Button
									variant='ghost'
									className='w-8 h-8 p-0 items-center justify-center'
								>
									<X
										size={24}
										strokeWidth={1}
									/>
								</Button>
							</Sidebar.Close>
						</div>
					</Sidebar.Header>

					<nav className='p-4 space-y-3'>
						{MENU.map(item => (
							<NavItem
								key={item.label}
								label={item.label}
								href={item.href ?? '#'}
							/>
						))}
					</nav>
				</Sidebar.Content>
			</Sidebar.Portal>
		</Sidebar>
	);
}
