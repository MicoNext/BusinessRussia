import { RuTubeIcon, TelegramIcon, VkIcon } from '@/components/ui/socialIcons';
import { ISocialIconProps } from './base';

interface IconProps extends ISocialIconProps {
	iconName: 'vk' | 'telegram' | 'youtube' | 'rutube' | 'whatsapp';
}

export function Icon({ iconName, width = 24, height = 24 }: IconProps) {
	switch (iconName) {
		case 'vk':
			return (
				<VkIcon
					width={width}
					height={height}
				/>
			);
		case 'telegram':
			return (
				<TelegramIcon
					width={width}
					height={height}
				/>
			);
		case 'rutube':
			return (
				<RuTubeIcon
					width={width}
					height={height}
				/>
			);
		default:
			return null;
	}
}
