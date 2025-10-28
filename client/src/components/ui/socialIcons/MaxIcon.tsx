import { ISocialIconProps } from './base';

export function MaxIcon({
	width = 24,
	height = 24,
	viewBox = '0 0 24 24',
	fill = 'currentColor',
}: ISocialIconProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox={viewBox}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 7.5H13.5V10.5H16.5V7.5ZM10.5 7.5H7.5V10.5H10.5V7.5ZM7.5 13.5H10.5V16.5H7.5V13.5ZM13.5 13.5H16.5V16.5H13.5V13.5Z"
				fill={fill}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM16.5 7.5H13.5V10.5H16.5V7.5ZM10.5 7.5H7.5V10.5H10.5V7.5ZM7.5 13.5H10.5V16.5H7.5V13.5ZM13.5 13.5H16.5V16.5H13.5V13.5Z"
				fill={fill}
			/>
		</svg>
	);
}