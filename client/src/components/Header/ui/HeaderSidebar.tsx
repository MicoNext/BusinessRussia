'use client';
import Sidebar from '@/components/Sidebar';
import { Button, UnstyledButton } from '@/components/ui/buttons';
import { MENU } from '../constants/menu.data';
import NavItem from './NavItem';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import JoinButton from './JoinButton';

export function HeaderSidebar() {
	return (
		<Sidebar initialOpen={false}>
			<Sidebar.Trigger asChild>
				<UnstyledButton>
					<Menu
						size={24}
						strokeWidth={1}
					/>
				</UnstyledButton>
			</Sidebar.Trigger>

			<Sidebar.Portal>
				<Sidebar.Overlay className='animate-fade-in z-50' />

				<Sidebar.Content
					side='left'
					size='md'
					className='flex flex-col animate-slide-in-left z-50'
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

					<div className='flex-1 p-4 flex flex-col gap-4'>
						<nav className='flex-1 flex flex-col gap-2'>
							{MENU.map(item => (
								<NavItem
									key={item.label}
									label={item.label}
									href={item.href ?? '#'}
								/>
							))}
						</nav>
					</div>
					<Sidebar.Footer>
						<div
							className='flex items-center gap-2'
							aria-label='Быстрые действия'
						>
							<JoinButton className='w-full justify-center' />
						</div>
					</Sidebar.Footer>
				</Sidebar.Content>
			</Sidebar.Portal>
		</Sidebar>
	);
}
