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
import { cn } from '@/lib/utils';
import {
	Check,
	User,
	Briefcase,
	Lock,
	EyeIcon,
	EyeOffIcon,
	Building,
	Globe,
	Mail,
	AtSign,
} from 'lucide-react';
import { RootState } from '@/redux/store';
import { registerUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import Link from 'next/link';

const schema = yup.object({
	firstName: yup
		.string()
		.required('First name is required')
		.min(2, 'First name must be at least 2 characters')
		.max(50, 'First name must not exceed 50 characters')
		.matches(
			/^[a-zA-Z\s]*$/,
			'First name should only contain letters and spaces',
		),
	lastName: yup
		.string()
		.required('Last name is required')
		.min(2, 'Last name must be at least 2 characters')
		.max(50, 'Last name must not exceed 50 characters')
		.matches(
			/^[a-zA-Z\s]*$/,
			'Last name should only contain letters and spaces',
		),
	email: yup
		.string()
		.required('Email is required')
		.email('Please enter a valid email address')
		.max(100, 'Email must not exceed 100 characters'),
	position: yup.string().max(100, 'Position must not exceed 100 characters'),
	companyName: yup
		.string()
		.max(100, 'Company name must not exceed 100 characters'),
	companyWebsite: yup
		.string()
		.url('Please enter a valid URL (e.g., https://example.com)')
		.max(100, 'Company website must not exceed 100 characters'),
	username: yup
		.string()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters')
		.max(30, 'Username must not exceed 30 characters')
		.matches(
			/^[a-zA-Z0-9_-]*$/,
			'Username can only contain letters, numbers, underscores, and hyphens',
		),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(100, 'Password must not exceed 100 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
		),
	confirmPassword: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password')], "Passwords don't match"),
});

type FormData = yup.InferType<typeof schema>;

export default function Registration() {
	const [step, setStep] = useState(1);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: FormData) => {
		try {
			await dispatch(
				registerUser({
					email: data.email,
					password: data.password,
					firstName: data.firstName,
					lastName: data.lastName,
					username: data.username,
					position: data.position,
					companyName: data.companyName,
					companyWebsite: data.companyWebsite,
				}),
			)
				.unwrap()
				.then(() => router.push('/profile'));
		} catch (error) {
			setStep(3);
			console.error('Registration failed:', error);
		}
	};

	const nextStep = async () => {
		const fields =
			step === 1
				? (['firstName', 'lastName', 'email'] as const)
				: (['position', 'companyName', 'companyWebsite'] as const);

		const isStepValid = await trigger(fields);
		if (isStepValid) setStep(step + 1);
	};

	const prevStep = () => setStep(step - 1);

	const renderInput = (
		name: keyof FormData,
		label: string,
		type: string = 'text',
		placeholder: string = '',
		icon: React.ReactNode = null,
	) => (
		<div className='space-y-2'>
			<Label htmlFor={name}>{label}</Label>
			<div className='relative'>
				<Input
					id={name}
					type={type}
					placeholder={placeholder}
					{...register(name)}
					className={cn('pl-10', errors[name] ? 'border-red-500' : '')}
				/>
				{icon && (
					<div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
						{icon}
					</div>
				)}
				{(name === 'password' || name === 'confirmPassword') && (
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
						onClick={() =>
							name === 'password'
								? setShowPassword(!showPassword)
								: setShowConfirmPassword(!showConfirmPassword)
						}>
						{(name === 'password' && showPassword) ||
						(name === 'confirmPassword' && showConfirmPassword) ? (
							<EyeOffIcon className='h-4 w-4 text-gray-400' />
						) : (
							<EyeIcon className='h-4 w-4 text-gray-400' />
						)}
					</Button>
				)}
			</div>
			{errors[name] && (
				<p className='text-red-500 text-sm'>{errors[name]?.message}</p>
			)}
		</div>
	);

	const steps = [
		{ icon: User, label: 'Basics' },
		{ icon: Briefcase, label: 'Company' },
		{ icon: Lock, label: 'Account' },
	];

	return (
		<div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>
						Register
					</CardTitle>
					<CardDescription className='text-center'>
						Create your account in a few easy steps.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='mb-8'>
						<div className='flex justify-between'>
							{steps.map((s, i) => (
								<div key={i} className='flex flex-col items-center'>
									<div
										className={cn(
											'w-10 h-10 rounded-full border-2 flex items-center justify-center',
											step > i
												? 'bg-primary border-primary'
												: step === i + 1
												? 'border-primary text-primary'
												: 'border-gray-300 text-gray-300',
										)}>
										{step > i ? (
											<Check className='h-6 w-6 text-white dark:text-black' />
										) : (
											<s.icon className='h-5 w-5' />
										)}
									</div>
									<div
										className={cn(
											'mt-2 text-sm',
											step >= i + 1 ? 'text-primary' : 'text-gray-300',
										)}>
										{s.label}
									</div>
								</div>
							))}
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						{step === 1 && (
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									{renderInput(
										'firstName',
										'First Name',
										'text',
										'John',
										<User size={18} />,
									)}
									{renderInput(
										'lastName',
										'Last Name',
										'text',
										'Doe',
										<User size={18} />,
									)}
								</div>
								{renderInput(
									'email',
									'Email',
									'email',
									'john@example.com',
									<Mail size={18} />,
								)}
							</div>
						)}

						{step === 2 && (
							<div className='space-y-4'>
								{renderInput(
									'position',
									'Position',
									'text',
									'Software Engineer',
									<Briefcase size={18} />,
								)}
								{renderInput(
									'companyName',
									'Company Name',
									'text',
									'Acme Inc.',
									<Building size={18} />,
								)}
								{renderInput(
									'companyWebsite',
									'Company Website',
									'url',
									'https://example.com',
									<Globe size={18} />,
								)}
							</div>
						)}

						{step === 3 && (
							<div className='space-y-4'>
								{renderInput(
									'username',
									'Username',
									'text',
									'johndoe',
									<AtSign size={18} />,
								)}
								{renderInput(
									'password',
									'Password',
									showPassword ? 'text' : 'password',
									'••••••••',
									<Lock size={18} />,
								)}
								{renderInput(
									'confirmPassword',
									'Confirm Password',
									showConfirmPassword ? 'text' : 'password',
									'••••••••',
									<Lock size={18} />,
								)}
							</div>
						)}

						{error && <p className='text-red-500 mt-4'>{error}</p>}
					</form>
				</CardContent>
				<CardFooter>
					<div className='flex justify-between w-full'>
						{step > 1 && step < 4 && (
							<Button type='button' onClick={prevStep} variant='outline'>
								Back
							</Button>
						)}
						{step < 3 && (
							<Button type='button' onClick={nextStep} className='ml-auto'>
								Next
							</Button>
						)}
						{step === 3 && (
							<Button
								type='submit'
								onClick={handleSubmit(onSubmit)}
								className='ml-auto'
								disabled={isLoading}>
								{isLoading ? 'Registering...' : 'Register'}
							</Button>
						)}
					</div>
				</CardFooter>
				{step === 3 && (
					<div className='text-sm text-center mt-4 mb-4'>
						Already have an account?{' '}
						<Link href='/login' className='text-primary hover:underline'>
							Log in
						</Link>
					</div>
				)}
			</Card>
		</div>
	);
}
