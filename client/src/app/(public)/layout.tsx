import Header from '@/components/Header';
import Footer from '@/components/Footer';

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className=''>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default layout;
