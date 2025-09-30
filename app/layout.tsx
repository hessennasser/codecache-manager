import { Inter } from 'next/font/google';
import { MainNav } from '@/components/shared/Header/MainNav';
import MainProvider from '@/components/providers';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'codeCache',
	description: 'CodeCache - Code snippets for developers, engineers, and more.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${inter.className} bg-slate-50 text-black dark:bg-slate-900 dark:text-white`}>
				<ToastContainer />
				<MainProvider>
					<div className='flex flex-col min-h-screen'>
						<MainNav />
						<main className='flex-1'>{children}</main>
					</div>
				</MainProvider>
			</body>
		</html>
	);
}
