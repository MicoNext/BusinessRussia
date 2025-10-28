import Logo from '@/components/ui/Logo';
import JoinButton from './ui/JoinButton';
import Menu from './ui/Menu';
import { HeaderSidebar } from './ui/HeaderSidebar';
import { SocialMedia } from '@/components/SocialMedia';
import { ICompanyInfo } from '../../../../package/types/models/companyInfo';
import { Icon } from '../ui/socialIcons';

type PropsType = {
	companyInfo: ICompanyInfo
}

type SocialMediaType = {
		icon: React.ReactNode;
		href: string;
	}[];

export default function Header({ companyInfo }: PropsType) {

	const SOCIAL_MEDIA: SocialMediaType = []
	if(companyInfo.maxUrl) SOCIAL_MEDIA.push({ icon: <Icon iconName='max' />, href: companyInfo.maxUrl })
	if(companyInfo.telegramUrl) SOCIAL_MEDIA.push({ icon: <Icon iconName='telegram' />, href: companyInfo.telegramUrl })
	if(companyInfo.whatsappUrl) SOCIAL_MEDIA.push({ icon: <Icon iconName='whatsapp' />, href: companyInfo.whatsappUrl })
	if(companyInfo.vkUrl) SOCIAL_MEDIA.push({ icon: <Icon iconName='vk' />, href: companyInfo.vkUrl })
		
	return (
		<header
			className='sticky top-0 z-50 bg-white border-b border-gray-200 text-brand-grayText px-4 md:px-8 lg:px-12'
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
					<div className='hidden sm:flex items-center gap-4'>
						<div
							className='flex items-center gap-2'
							aria-label='Быстрые действия'
						>
							<JoinButton />
						</div>
					</div>
				</div>

				<div className=''>
					<Menu />
				</div>
			</div>
		</header>
	);
}
