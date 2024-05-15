import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Provider from '@/redux/provider';
import { Provider } from '@/components/common/Providers'
import { Footer, Navbar } from '@/components/common';
import { Setup } from '@/components/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Learning Journey',
	description: 'Learning Journey is course generated ',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>
					<Setup />
					<Navbar />
					{/* <div className='max-w-7xl min-h-[601px] mx-auto'> */}
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8 min-h-[601px]'>
						{children}
					</div>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}

