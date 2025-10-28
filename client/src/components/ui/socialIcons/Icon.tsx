import { MaxIcon, RuTubeIcon, TelegramIcon, VkIcon } from '@/components/ui/socialIcons';
import { ISocialIconProps } from './base';
import { ChartArea, WandIcon } from 'lucide-react';
import { WaIcon } from './WaIcon';

interface IconProps extends ISocialIconProps {
	iconName: 'vk' | 'telegram' | 'youtube' | 'rutube' | 'whatsapp' | 'max';
	className?: string
}

export function Icon({ iconName, width = 24, height = 24, className }: IconProps) {
	switch (iconName) {
		case 'vk':
			return (
				<div className={className}>
					<VkIcon
						width={width}
						height={height}
					/>
				</div>
			);
		case 'telegram':
			return (
				<div className={className}>

					<TelegramIcon
						width={width}
						height={height}
					/>
				</div>
			);
		case 'rutube':
			return (
				<div className={className}>

					<RuTubeIcon
						width={width}
						height={height}
					/>
				</div>
			);
		case 'max':
			return (
				<div className={className}>
					<MaxIcon
						width={width}
						height={height}
					/>
				</div>
			);
		case 'whatsapp':
			return (
				<div className={className}>
					<WaIcon
						width={width}
						height={height}
					/>
				</div>
			);
		default:
			return null;
	}
}
