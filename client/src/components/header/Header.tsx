import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';
import JoinButton from './ui/JoinButton';
import PayFeeButton from './ui/PayFeeButton';
import SearchButton from './ui/SearchButton';
import Menu from './ui/Menu';

interface HeaderProps {
	type?: 'help';
	hiddenTitile?: boolean;
}

export default function Header({ type, hiddenTitile }: HeaderProps) {
	return (
		<header
			className='border-b border-gray-200 text-brand-grayText'
			role='banner'
		>
			<SkipToContent />
			<div className='container mx-auto px-4'>
				<div
					className='flex items-center justify-between h-16'
					aria-label='Top bar'
				>
					<div className='flex items-center gap-3'>
						<Logo />
					</div>

					<div className='flex items-center gap-4'>
						<SearchButton />
						<div
							className='hidden sm:flex items-center gap-2'
							aria-label='Quick actions'
						>
							<JoinButton />
							<PayFeeButton />
						</div>
					</div>
				</div>
				<Menu />
			</div>
		</header>
	);
}

function SkipToContent() {
	return (
		<a
			href='#main'
			className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded'
		>
			Перейти к содержимому
		</a>
	);
}

function BurgerButton() {
	return (
		<button
			type='button'
			className='inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
			aria-label='Открыть меню'
			aria-controls='site-navigation'
			aria-expanded='false'
		></button>
	);
}
