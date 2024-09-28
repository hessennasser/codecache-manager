'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { Code, Home, Plus, User, Menu, LogIn, UserPlus } from 'lucide-react';
import { ThemeSwitcher } from '@/components/shared/Header/ThemeSwitcher';
import { UserNav } from './UserNav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MainSearch from './MainSearch';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/hooks/useRedux';
import { getMe } from '@/redux/features/auth/authSlice';

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const { user } = useSelector((state: RootState) => state.auth);

	const refreshUserInfo = () => {
		dispatch(getMe());
	};

	useEffect(() => {
		refreshUserInfo();
	}, []);

	const navItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/snippets', label: 'Snippets', icon: Code },
		{ href: '/create', label: 'Create', icon: Plus },
		{ href: '/profile', label: 'Profile', icon: User },
	];

	const NavLinks = ({ mobile = false }) => (
		<>
			{navItems.map(item => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-gray-100',
						pathname === item.href ? 'text-gray-100' : 'text-gray-300',
						mobile && 'py-2',
					)}>
					<item.icon className='h-4 w-4' />
					<span>{item.label}</span>
				</Link>
			))}
		</>
	);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
				'transition-colors duration-200',
				className,
			)}
			{...props}>
			<div className='container flex h-14 items-center'>
				<div className='mr-4 hidden md:flex'>
					<Link href='/' className='mr-6 flex items-center space-x-2'>
						<Code className='h-6 w-6 text-primary text-white' />
						<span className='hidden font-bold text-primary sm:inline-block text-white'>
							codeCache
						</span>
					</Link>
					<nav className='flex items-center space-x-6 text-sm font-medium'>
						<NavLinks />
					</nav>
				</div>
				{/* mobile menu */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='ghost'
							className='mr-2 px-0 text-base hover:bg-transparent dark:hover:bg-gray-700 focus-visible:bg-transparent dark:focus-visible:bg-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'>
							<Menu className='h-5 w-5 text-primary dark:text-white' />
							<span className='sr-only'>Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left' className='pr-0 dark:bg-gray-800'>
						<Link
							href='/'
							className='flex items-center space-x-2 text-primary dark:text-white'>
							<Code className='h-6 w-6' />
							<span className='font-bold'>codeCache</span>
						</Link>
						<nav className='mt-6 flex flex-col space-y-3'>
							<NavLinks mobile />
							{!user && (
								<>
									<Link
										href='/login'
										className='flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-gray-100 py-2'>
										<LogIn className='h-4 w-4' />
										<span>Login</span>
									</Link>
									<Link
										href='/register'
										className='flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-gray-100 py-2'>
										<UserPlus className='h-4 w-4' />
										<span>Register</span>
									</Link>
								</>
							)}
						</nav>
					</SheetContent>
				</Sheet>
				<div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
					<MainSearch />
					<nav className='flex items-center gap-2'>
						<ThemeSwitcher />
						{user ? (
							<UserNav />
						) : (
							<div className='hidden md:flex items-center space-x-2'>
								<Link href='/login'>
									<Button variant='ghost'>Login</Button>
								</Link>
								<Link href='/register'>
									<Button>Register</Button>
								</Link>
							</div>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}