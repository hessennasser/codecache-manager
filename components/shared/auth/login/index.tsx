'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
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
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { loginUser } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';

const schema = yup.object({
	email: yup
		.string()
		.required('Email is required')
		.email('Please enter a valid email address'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function Login() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isLoading, error } = useAppSelector((state: RootState) => state.auth);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const result = await dispatch(loginUser({ email: data.email, password: data.password }));

			if (result.meta.requestStatus === 'fulfilled') {
				router.push('/my-snippets');
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl font-bold text-center'>
						Login
					</CardTitle>
					<CardDescription className='text-center'>
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<div className='relative'>
								<Input
									id='email'
									type='email'
									placeholder='name@example.com'
									{...register('email')}
									className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
								/>
								<MailIcon
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
									size={18}
								/>
							</div>
							{errors.email && (
								<p className='text-red-500 text-sm'>{errors.email.message}</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='relative'>
								<Input
									id='password'
									type={showPassword ? 'text' : 'password'}
									placeholder='••••••••'
									{...register('password')}
									className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
								/>
								<LockIcon
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
									size={18}
								/>
								<Button
									type='button'
									variant='ghost'
									size='sm'
									className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<EyeOffIcon className='h-4 w-4 text-gray-400' />
									) : (
										<EyeIcon className='h-4 w-4 text-gray-400' />
									)}
								</Button>
							</div>
							{errors.password && (
								<p className='text-red-500 text-sm'>
									{errors.password.message}
								</p>
							)}
						</div>

						{error && <p className='text-red-500 mt-4'>{error}</p>}

						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					{/* <div className='text-sm text-center'>
						<Link
							href='/forgot-password'
							className='text-primary hover:underline'>
							Forgot your password?
						</Link>
					</div> */}
					<div className='text-sm text-center'>
						Don't have an account?{' '}
						<Link href='/register' className='text-primary hover:underline'>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
