import Footer from '@/components/Footer';

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='min-h-screen flex flex-col justify-between'>
			{children}
			<Footer />
		</div>
	);
}

export default layout;
