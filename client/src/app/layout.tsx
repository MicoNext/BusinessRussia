import { Inter } from 'next/font/google';
import './globals.css';
import { metadata } from './metadata';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
});

export { metadata };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='ru'
			className='light'
			suppressHydrationWarning
		>
			<body className={`${inter.className} text-gray-900`}>{children}</body>
		</html>
	);
}
