'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getMe, updateProfile } from '@/redux/features/auth/authSlice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
	AlertCircle,
	Briefcase,
	Building,
	Globe,
	Mail,
	User,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UpdateProfileData {
	firstName?: string;
	lastName?: string;
	username?: string;
	position?: string;
	companyName?: string;
	companyWebsite?: string;
	password?: string;
}

export default function ProfilePage() {
	const user = useAppSelector(state => state.auth.user);
	const token = Cookies.get('token');
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [formData, setFormData] = useState<UpdateProfileData>({
		firstName: '',
		lastName: '',
		username: '',
		position: '',
		companyName: '',
		companyWebsite: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isClient, setIsClient] = useState(false);
	const [activeTab, setActiveTab] = useState('info');

	useEffect(() => {
		setIsClient(true);
		if (user) {
			setFormData({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				username: user.username || '',
				position: user.position || '',
				companyName: user.companyName || '',
				companyWebsite: user.companyWebsite || '',
			});
		}
	}, [user]);

	useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, [token, router]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			await dispatch(updateProfile(formData));
			dispatch(getMe());
			setIsLoading(false);
			setActiveTab('info'); // Switch back to info tab after successful update
		} catch (err) {
			setError('Failed to update profile. Please try again.');
			dispatch(getMe());
			setIsLoading(false);
		}
	};

	if (!isClient || !user) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<Card className='max-w-2xl mx-auto'>
					<CardHeader>
						<Skeleton className='h-12 w-[250px]' />
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{[1, 2, 3, 4, 5].map(i => (
								<Skeleton key={i} className='h-4 w-full' />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='container mx-auto py-8'>
			<Card>
				<CardHeader>
					<div className='flex items-center space-x-4'>
						<Avatar className='w-24 h-24'>
							<AvatarImage
								src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
								alt={`${user.firstName} ${user.lastName}`}
							/>
							<AvatarFallback>
								{user.firstName[0]}
								{user.lastName[0]}
							</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className='text-3xl'>
								{user.firstName} {user.lastName}
							</CardTitle>
							<CardDescription className='text-lg'>
								<Mail className='inline-block mr-1 h-4 w-4' />
								{user.email}
							</CardDescription>
							<Badge
								variant={user.isEmailVerified ? 'secondary' : 'destructive'}
								className='mt-2'>
								{user.isEmailVerified ? 'Verified' : 'Not Verified'}
							</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={setActiveTab} defaultValue='info' className='w-full'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='info'>Profile Info</TabsTrigger>
							<TabsTrigger value='edit'>Edit Profile</TabsTrigger>
						</TabsList>
						<TabsContent value='info'>
							<div className='space-y-6 mt-6'>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<h3 className='font-semibold flex items-center'>
											<User className='mr-2' />
											Username
										</h3>
										<p>{user.username}</p>
									</div>
									<div>
										<h3 className='font-semibold flex items-center'>
											<Briefcase className='mr-2' />
											Position
										</h3>
										<p>{user.position || 'Not specified'}</p>
									</div>
								</div>
								<div>
									<h3 className='font-semibold flex items-center'>
										<Building className='mr-2' />
										Company
									</h3>
									<p>{user.companyName || 'Not specified'}</p>
								</div>
								<div>
									<h3 className='font-semibold flex items-center'>
										<Globe className='mr-2' />
										Company Website
									</h3>
									<p>
										{user.companyWebsite ? (
											<a
												href={user.companyWebsite}
												target='_blank'
												rel='noopener noreferrer'
												className='text-blue-500 hover:underline'>
												{user.companyWebsite}
											</a>
										) : (
											'Not specified'
										)}
									</p>
								</div>
								{user.createdAt && (
									<div>
										<h3 className='font-semibold'>Account Created</h3>
										<p>{new Date(user.createdAt).toLocaleDateString()}</p>
									</div>
								)}
							</div>
						</TabsContent>
						<TabsContent value='edit'>
							<form onSubmit={handleSubmit} className='space-y-6 mt-6'>
								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='firstName'>First Name</Label>
										<Input
											id='firstName'
											name='firstName'
											value={formData.firstName}
											onChange={handleInputChange}
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='lastName'>Last Name</Label>
										<Input
											id='lastName'
											name='lastName'
											value={formData.lastName}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='username'>Username</Label>
									<Input
										id='username'
										name='username'
										value={formData.username}
										onChange={handleInputChange}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='position'>Position</Label>
									<Input
										id='position'
										name='position'
										value={formData.position}
										onChange={handleInputChange}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='companyName'>Company Name</Label>
									<Input
										id='companyName'
										name='companyName'
										value={formData.companyName}
										onChange={handleInputChange}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='companyWebsite'>Company Website</Label>
									<Input
										id='companyWebsite'
										name='companyWebsite'
										value={formData.companyWebsite}
										onChange={handleInputChange}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='password'>
										New Password (leave blank to keep current)
									</Label>
									<Input
										id='password'
										name='password'
										type='password'
										onChange={handleInputChange}
									/>
								</div>
								{error && (
									<Alert variant='destructive'>
										<AlertCircle className='h-4 w-4' />
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<div className='flex justify-end space-x-2'>
									<Button type='submit' disabled={isLoading}>
										{isLoading ? 'Updating...' : 'Save Changes'}
									</Button>
								</div>
							</form>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
