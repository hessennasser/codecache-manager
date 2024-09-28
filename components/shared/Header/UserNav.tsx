'use client';

import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getMe, logoutUser } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { User, LogOut, Code, Bookmark } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';

export function UserNav() {
	const dispatch = useAppDispatch();
	const { user, isLoading } = useSelector((state: RootState) => state.auth);

	const handleLogout = () => {
		dispatch(logoutUser());
	};


	if (isLoading) {
		return (
			<Button variant='ghost' size='sm' className='w-8 h-8 rounded-full'>
				...
			</Button>
		);
	}

	if (!user) {
		return (
			<Link href='/login' passHref>
				<Button variant='ghost' size='sm'>
					Log in
				</Button>
			</Link>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={'/avatars/01.png'} alt={user.username} />
						<AvatarFallback>
							{user.firstName[0]}
							{user.lastName[0]}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user.username}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href='/profile' className='w-full flex items-center'>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href='/my-snippets' className='w-full flex items-center'>
							<Code className='mr-2 h-4 w-4' />
							<span>My Snippets</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href='/saved-snippets' className='w-full flex items-center'>
							<Bookmark className='mr-2 h-4 w-4' />
							<span>Saved Snippets</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className='w-full flex items-center text-red-600 focus:text-red-600 cursor-pointer'>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
