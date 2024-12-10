'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchFormProps {
	initialSearchTerm: string;
	initialProgrammingLanguage: string;
	initialTags: string[];
	onSearch: (
		newSearchTerm: string,
		newProgrammingLanguage: string,
		newTags: string[],
	) => void;
}

const programmingLanguages = [
	{ value: 'all', label: 'All Languages' },
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' },
	{ value: 'csharp', label: 'C#' },
	{ value: 'typescript', label: 'TypeScript' },
	{ value: 'go', label: 'Go' },
	{ value: 'rust', label: 'Rust' },
	{ value: 'ruby', label: 'Ruby' },
	{ value: 'php', label: 'PHP' },
];

const tags = [
	{ value: 'React', label: 'React' },
	{ value: 'Angular', label: 'Angular' },
	{ value: 'Vue', label: 'Vue' },
	{ value: 'Frontend', label: 'Frontend' },
	{ value: 'Backend', label: 'Backend' },
	{ value: 'FullStack', label: 'FullStack' },
	{ value: 'DevOps', label: 'DevOps' },
	{ value: 'Database', label: 'Database' },
	{ value: 'AI', label: 'AI' },
	{ value: 'MachineLearning', label: 'Machine Learning' },
	{ value: 'DataScience', label: 'Data Science' },
	{ value: 'WebDevelopment', label: 'Web Development' },
	{ value: 'MobileDevelopment', label: 'Mobile Development' },
];

export function SearchForm({
	initialSearchTerm,
	initialProgrammingLanguage,
	initialTags,
	onSearch,
}: SearchFormProps) {
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
	const [programmingLanguage, setProgrammingLanguage] = useState(
		initialProgrammingLanguage,
	);
	const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

	useEffect(() => {
		console.log('SearchForm mounted or updated');
		console.log('initialSearchTerm:', initialSearchTerm);
		console.log('initialProgrammingLanguage:', initialProgrammingLanguage);
		console.log('initialTags:', initialTags);
		setSearchTerm(initialSearchTerm);
		setProgrammingLanguage(initialProgrammingLanguage);
		setSelectedTags(initialTags);
	}, [initialSearchTerm, initialProgrammingLanguage, initialTags]);

	const handleSearch = () => {
		console.log('Search triggered');
		console.log('searchTerm:', searchTerm);
		console.log('programmingLanguage:', programmingLanguage);
		console.log('selectedTags:', selectedTags);
		onSearch(searchTerm, programmingLanguage, selectedTags);
	};

	const handleSelectTag = (tag: string) => {
		console.log('Tag selected:', tag);
		if (!selectedTags.includes(tag)) {
			setSelectedTags(prev => [...prev, tag]);
		}
	};

	const handleRemoveTag = (tag: string) => {
		console.log('Tag removed:', tag);
		setSelectedTags(prev => prev.filter(t => t !== tag));
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className='space-y-4 mb-4'>
			<div className='flex flex-col sm:flex-row gap-4'>
				<div className='flex-1'>
					<Label htmlFor='search' className='text-sm font-medium'>
						Search
					</Label>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							id='search'
							placeholder='Search snippets...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
							className='pl-8'
						/>
					</div>
				</div>
				<div>
					<Label htmlFor='programmingLanguage' className='text-sm font-medium'>
						Programming Language
					</Label>
					<Select
						value={programmingLanguage}
						onValueChange={setProgrammingLanguage}>
						<SelectTrigger className='w-full sm:w-[200px]'>
							<SelectValue placeholder='Select Language' />
						</SelectTrigger>
						<SelectContent>
							{programmingLanguages.map(lang => (
								<SelectItem key={lang.value} value={lang.value}>
									<div className='flex items-center justify-between w-full'>
										{lang.label}
										{lang.value === programmingLanguage && (
											<Check className='ml-2 h-4 w-4' />
										)}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div>
				<Label htmlFor='tags' className='text-sm font-medium'>
					Tags
				</Label>
				<Select onValueChange={handleSelectTag}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Select tags...' />
					</SelectTrigger>
					<SelectContent>
						{tags.map(tag => (
							<SelectItem key={tag.value} value={tag.value}>
								<div className='flex items-center justify-between w-full'>
									{tag.label}
									{selectedTags.includes(tag.value) && (
										<Check className='ml-2 h-4 w-4' />
									)}
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-wrap gap-2 mt-2'>
				{selectedTags.map(tag => (
					<Badge key={tag} variant='secondary'>
						{tag}
						<Button
							variant='ghost'
							size='sm'
							onClick={() => handleRemoveTag(tag)}
							className='ml-1 h-auto p-0 text-muted-foreground hover:text-foreground'>
							<X className='h-3 w-3' />
						</Button>
					</Badge>
				))}
			</div>
			<Button onClick={handleSearch} className='w-full'>
				<Search className='mr-2 h-4 w-4' />
				Search
			</Button>
		</div>
	);
}

export default SearchForm;
