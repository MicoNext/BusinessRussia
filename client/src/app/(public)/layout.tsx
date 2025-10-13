import Header from '@/components/Header';
import Footer from '@/components/Footer';

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='container mx-auto px-4'>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default layout;
