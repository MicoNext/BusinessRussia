import Logo from '@/components/ui/Logo';
import JoinButton from './ui/JoinButton';
import PayFeeButton from './ui/PayFeeButton';
import SearchButton from './ui/SearchButton';
import Menu from './ui/Menu';
import { HeaderSidebar } from './ui/HeaderSidebar';
import { SocialMedia } from '../SocialMedia';
import { SOCIAL_MEDIA } from '@/constants/socialMedia';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
	return (
		<header
			className='border-b border-gray-200 text-brand-grayText px-4 md:px-8 lg:px-12'
			role='banner'
		>
			<div className='container mx-auto'>
				<div
					className='flex items-center justify-between h-16 gap-3'
					aria-label='Верхняя панель'
				>
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-3 md:border-r md:border-gray-200 md:pr-3'>
							<HeaderSidebar />
							<Logo />
						</div>
						<SocialMedia
							items={SOCIAL_MEDIA}
							className='hidden md:flex'
						/>
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
