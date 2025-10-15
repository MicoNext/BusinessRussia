import Logo from '@/components/ui/Logo';
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
			className='border-b border-gray-200 text-brand-grayText px-4 md:px-8 lg:px-12'
			role='banner'
		>
			<SkipToContent />
			<div className='container mx-auto'>
				<div
					className='flex items-center justify-between h-16 gap-3'
					aria-label='Верхняя панель'
				>
					<div className='flex items-center gap-3'>
						<Logo />
					</div>

					<SearchButton />
					<div className='hidden sm:flex items-center gap-4'>
						<div
							className='flex items-center gap-2'
							aria-label='Быстрые действия'
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
