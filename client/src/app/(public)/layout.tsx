import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollTop } from '@/components/ScrollTop';

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
			<ScrollTop />
		</div>
	);
}

export default layout;
