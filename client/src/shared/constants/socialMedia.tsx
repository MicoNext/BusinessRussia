import { Icon } from '@/components/ui/socialIcons';
import { companyInfoMock } from '@/shared/data/companyInfo.mock';

export const SOCIAL_MEDIA = companyInfoMock.socialMedia?.map(sm => ({
	icon: (
		<Icon
			iconName={sm.iconName}
			width={18}
			height={18}
		/>
	),
	href: sm.href,
	title: sm.title,
}));
