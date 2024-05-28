import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Provider from '@/redux/provider';
import { Provider } from '@/components/common/Providers';
import { Footer, Navbar } from '@/components/common';
import { Setup } from '@/components/utils';
import { ThemeProvider } from "next-themes";

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
			<body className={`${inter.className} overflow-x-hidden`}>
				<ThemeProvider attribute="class">
					<Provider>
						<Setup />
						<Navbar />
						<div className='m-3 w-screen min-h-[601px] overflow-x-hidden text-theme'>
							{children}
						</div>
						<Footer />
					</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
