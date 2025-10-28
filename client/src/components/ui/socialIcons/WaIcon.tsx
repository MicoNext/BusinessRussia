import Image from 'next/image';
import { ISocialIconProps } from './base';

export function WaIcon({
	width = 24,
	height = 24,
}: ISocialIconProps) {
	return (
		<Image
			alt='whatsapp'
			width={width}
			height={height}
			src='/social/wa-icon.svg'
		>
		</Image>
	);
}