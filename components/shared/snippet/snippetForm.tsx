'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAppDispatch } from '@/hooks/useRedux';
import { createSnippet } from '@/redux/features/snippets/snippetSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { AlertCircle, X, Tag as TagIcon, Save, Eye, Code } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Editor from '@monaco-editor/react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import { useRouter } from 'next/navigation';
import { programmingLanguageOptions } from '@/lib/constants';

interface FormData {
	title: string;
	description: string;
	content: string;
	tags: string[];
	programmingLanguage: string;
	isPublic: boolean;
}

export default function SnippetForm() {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();
	const router = useRouter();

	const [formData, setFormData] = useState<FormData>({
		title: '',
		description: '',
		content: '',
		tags: [],
		programmingLanguage: 'javascript',
		isPublic: false,
	});
	const [currentTag, setCurrentTag] = useState('');
	const [errors, setErrors] = useState<Partial<FormData>>({});
	const [activeTab, setActiveTab] = useState('editor');
	const [charCount, setCharCount] = useState(0);

	useEffect(() => {
		setCharCount(formData.content.length);
	}, [formData.content]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: '' });
	};

	const handleEditorChange = (value: string | undefined) => {
		setFormData({ ...formData, content: value || '' });
		setErrors({ ...errors, content: '' });
	};

	const handleTagAdd = () => {
		if (currentTag && !formData.tags.includes(currentTag)) {
			setFormData({ ...formData, tags: [...formData.tags, currentTag] });
			setCurrentTag('');
		}
	};

	const handleTagRemove = (tag: string) => {
		setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
	};

	const validateForm = (): boolean => {
		const newErrors: Partial<FormData> = {};
		if (!formData.title.trim()) newErrors.title = 'Title is required';
		if (!formData.content.trim()) newErrors.content = 'Content is required';
		if (!formData.programmingLanguage)
			newErrors.programmingLanguage = 'Programming Language is required';
		if (formData.description.length > 500)
			newErrors.description = 'Description must be 500 characters or less';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			const snippetData = {
				title: formData.title,
				description: formData.description,
				content: formData.content,
				tags: formData.tags,
				programmingLanguage: formData.programmingLanguage,
				isPublic: formData.isPublic,
			};

			await dispatch(createSnippet(snippetData));

			// Clear form after submission
			setFormData({
				title: '',
				description: '',
				content: '',
				tags: [],
				programmingLanguage: 'javascript',
				isPublic: false,
			});

			router.push('/my-snippets');
		}
	};

	return (
		<Card className='w-full shadow-lg overflow-hidden'>
			<CardHeader>
				<CardTitle className='text-3xl font-bold'>Create New Snippet</CardTitle>
				<CardDescription>
					Share your code snippets with the world
				</CardDescription>
			</CardHeader>
			<CardContent className=''>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='title' className='text-lg font-semibold'>
								Title
							</Label>
							<Input
								id='title'
								name='title'
								value={formData.title}
								onChange={handleInputChange}
								maxLength={100}
								required
								className='w-full transition-all duration-200 focus:ring-2 focus:ring-primary'
								placeholder='Enter a descriptive title'
							/>
							{errors.title && (
								<p className='text-red-500 text-sm'>{errors.title}</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label
								htmlFor='programmingLanguage'
								className='text-lg font-semibold'>
								Programming Language
							</Label>
							<Select
								name='programmingLanguage'
								value={formData.programmingLanguage}
								onValueChange={value =>
									setFormData({
										...formData,
										programmingLanguage: value,
									})
								}>
								<SelectTrigger className='w-full transition-all duration-200 focus:ring-2 focus:ring-primary'>
									<SelectValue placeholder='Select a programmingLanguage' />
								</SelectTrigger>
								<SelectContent>
									{programmingLanguageOptions.map(lang => (
										<SelectItem key={lang} value={lang}>
											{lang}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.programmingLanguage && (
								<p className='text-red-500 text-sm'>
									{errors.programmingLanguage}
								</p>
							)}
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='description' className='text-lg font-semibold'>
							Description
						</Label>
						<Textarea
							id='description'
							name='description'
							value={formData.description}
							onChange={handleInputChange}
							maxLength={500}
							className='w-full min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary'
							placeholder='Provide a brief description of your snippet'
						/>
						<div className='flex justify-between text-sm text-gray-500'>
							<span>
								{500 - formData.description.length} characters remaining
							</span>
							{errors.description && (
								<span className='text-red-500'>{errors.description}</span>
							)}
						</div>
					</div>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='editor'>
								<Code className='w-5 h-5 mr-2' />
								Code Editor
							</TabsTrigger>
							<TabsTrigger value='preview'>
								<Eye className='w-5 h-5 mr-2' />
								Preview
							</TabsTrigger>
						</TabsList>
						<TabsContent value='editor' className='border rounded-md p-4'>
							<Editor
								height='400px'
								language={formData.programmingLanguage}
								value={formData.content}
								onChange={handleEditorChange}
								theme={theme === 'dark' ? 'vs-dark' : 'light'}
								options={{
									minimap: { enabled: false },
									scrollBeyondLastLine: false,
									wordWrap: 'on',
									lineNumbers: 'on',
									renderWhitespace: 'all',
									fontFamily: 'monospace',
									fontSize: 14,
								}}
							/>
							<div className='flex justify-between mt-2 text-sm text-gray-500'>
								<span>{charCount} characters</span>
								{errors.content && (
									<span className='text-red-500'>{errors.content}</span>
								)}
							</div>
						</TabsContent>
						<TabsContent
							value='preview'
							className='border rounded-md p-4 bg-secondary'>
							<Highlight
								theme={themes.nightOwl}
								code={formData.content}
								language={formData.programmingLanguage}>
								{({
									className,
									style,
									tokens,
									getLineProps,
									getTokenProps,
								}) => (
									<pre
										className={`${className} p-2 rounded-md overflow-x-auto`}
										style={style}>
										{tokens.map((line, i) => (
											<div key={i} {...getLineProps({ line, key: i })}>
												{line.map((token, key) => (
													<span key={key} {...getTokenProps({ token, key })} />
												))}
											</div>
										))}
									</pre>
								)}
							</Highlight>
						</TabsContent>
					</Tabs>

					<div className='space-y-2'>
						<Label className='text-lg font-semibold'>Tags</Label>
						<TooltipProvider>
							<div className='flex space-x-2'>
								<Input
									value={currentTag}
									onChange={e => setCurrentTag(e.target.value)}
									placeholder='Add a tag'
									onKeyUp={e =>
										e.key === 'Enter' && (e.preventDefault(), handleTagAdd())
									}
									className='flex-grow transition-all duration-200 focus:ring-2 focus:ring-primary'
								/>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											type='button'
											onClick={handleTagAdd}
											className='px-3'>
											<TagIcon size={20} />
										</Button>
									</TooltipTrigger>
									<TooltipContent>Add Tag</TooltipContent>
								</Tooltip>
							</div>
						</TooltipProvider>

						<AnimatePresence>
							<motion.div className='flex flex-wrap gap-2 mt-2'>
								{formData.tags.map(tag => (
									<motion.div
										key={tag}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ duration: 0.2 }}>
										<Badge
											variant='secondary'
											className='cursor-pointer flex items-center space-x-1 text-sm px-2 py-1 transition-all duration-200 hover:bg-secondary-hover'>
											<span>{tag}</span>
											<X
												size={14}
												onClick={() => handleTagRemove(tag)}
												className='text-gray-500 hover:text-gray-700'
											/>
										</Badge>
									</motion.div>
								))}
							</motion.div>
						</AnimatePresence>
					</div>

					<div className='flex items-center space-x-2'>
						<Switch
							id='isPublic'
							checked={formData.isPublic}
							onCheckedChange={checked =>
								setFormData({ ...formData, isPublic: checked })
							}
						/>
						<Label htmlFor='isPublic' className='text-lg'>
							Make this snippet public
						</Label>
					</div>

					{Object.keys(errors).length > 0 && (
						<Alert variant='destructive' className='mt-4'>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>
								Please correct the errors above before submitting.
							</AlertDescription>
						</Alert>
					)}
				</form>
			</CardContent>
			<CardFooter>
				<Button
					type='submit'
					onClick={handleSubmit}
					className='w-full text-lg font-semibold transition-all duration-200 hover:bg-primary-dark flex items-center justify-center'>
					<Save className='w-5 h-5 mr-2' />
					Create Snippet
				</Button>
			</CardFooter>
		</Card>
	);
}
