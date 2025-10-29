import Image from 'next/image';
import { ISocialIconProps } from './base';

export function MaxIcon({
	width = 24,
	height = 24,
}: ISocialIconProps) {
	return (
		<Image
			alt='max'
			width={width}
			height={height}
			src='/social/max-icon.svg'
		/>
	);
}