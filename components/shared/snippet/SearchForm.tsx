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
import { Search } from 'lucide-react';

interface SearchFormProps {
	initialSearchTerm: string;
	initialLanguage: string;
	initialTag: string;
	onSearch: (
		newSearchTerm: string,
		newLanguage: string,
		newTag: string,
	) => void;
}

export function SearchForm({
	initialSearchTerm,
	initialLanguage,
	initialTag,
	onSearch,
}: SearchFormProps) {
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
	const [language, setLanguage] = useState(initialLanguage);
	const [tag, setTag] = useState(initialTag);

	useEffect(() => {
		setSearchTerm(initialSearchTerm);
		setLanguage(initialLanguage);
		setTag(initialTag);
	}, [initialSearchTerm, initialLanguage, initialTag]);

	const handleSearch = () => {
		onSearch(searchTerm, language, tag);
	};

	return (
		<div className='mb-6 space-y-4'>
			<div className='flex flex-wrap gap-4'>
				<div className='flex-1'>
					<Label htmlFor='search'>Search</Label>
					<Input
						id='search'
						placeholder='Search snippets...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='w-full sm:w-auto'>
					<Label htmlFor='language'>Language</Label>
					<Select value={language} onValueChange={setLanguage}>
						<SelectTrigger className='w-full sm:w-[200px]'>
							<SelectValue placeholder='All languages' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>All languages</SelectItem>
							<SelectItem value='javascript'>JavaScript</SelectItem>
							<SelectItem value='python'>Python</SelectItem>
							<SelectItem value='java'>Java</SelectItem>
							<SelectItem value='csharp'>C#</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='w-full sm:w-auto'>
					<Label htmlFor='tag'>Tag</Label>
					<Select value={tag} onValueChange={setTag}>
						<SelectTrigger className='w-full sm:w-[200px]'>
							<SelectValue placeholder='All tags' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>All tags</SelectItem>
							<SelectItem value='React'>React</SelectItem>
							<SelectItem value='Hooks'>Hooks</SelectItem>
							<SelectItem value='Python'>Python</SelectItem>
							<SelectItem value='Lists'>Lists</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<Button onClick={handleSearch} className='w-full sm:w-auto'>
				<Search className='w-4 h-4 mr-2' />
				Search
			</Button>
		</div>
	);
}
