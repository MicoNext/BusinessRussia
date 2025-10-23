import Header from '@/components/header/index'
import Footer from '@/components/Footer';

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='min-h-screen flex flex-col justify-between'>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default layout;
