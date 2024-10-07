import React from 'react';
import { Button } from '@/components/ui/button';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from 'lucide-react';

interface PaginationProps {
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
	onPageChange: (page: number) => void;
}


export default function Pagination({
	pagination,
	onPageChange,
}: PaginationProps) {
	const { page: currentPage, totalPages } = pagination;

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const maxVisiblePages = 5; // Adjust this to show more or fewer pages
		const ellipsis = (
			<Button key='ellipsis' variant='ghost' className='w-10 h-10 p-0' disabled>
				<MoreHorizontal className='h-4 w-4' />
				<span className='sr-only'>More pages</span>
			</Button>
		);

		if (totalPages <= maxVisiblePages) {
			// If there are fewer pages than the max visible, show all of them
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(renderPageButton(i));
			}
		} else {
			// Always show first page
			pageNumbers.push(renderPageButton(1));

			if (currentPage > 3) {
				pageNumbers.push(ellipsis);
			}

			// Calculate start and end pages
			let startPage = Math.max(2, currentPage - 1);
			let endPage = Math.min(totalPages - 1, startPage + 2);

			if (endPage - startPage < 2) {
				startPage = Math.max(2, endPage - 2);
			}

			for (let i = startPage; i <= endPage; i++) {
				pageNumbers.push(renderPageButton(i));
			}

			if (currentPage < totalPages - 2) {
				pageNumbers.push(ellipsis);
			}

			// Always show last page
			pageNumbers.push(renderPageButton(totalPages));
		}

		return pageNumbers;
	};

	const renderPageButton = (pageNum: number) => (
		<Button
			key={pageNum}
			variant={pageNum === currentPage ? 'default' : 'outline'}
			className='w-10 h-10 p-0'
			onClick={() => onPageChange(pageNum)}>
			{pageNum}
			<span className='sr-only'>{`Go to page ${pageNum}`}</span>
		</Button>
	);

	return (
		<nav
			className='flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4'
			aria-label='Pagination'>
			<div className='flex items-center space-x-2'>
				<Button
					variant='outline'
					size='icon'
					onClick={() => onPageChange(1)}
					disabled={!pagination.hasPrevPage}
					aria-label='Go to first page'>
					<ChevronsLeft className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					size='icon'
					onClick={() => onPageChange(currentPage - 1)}
					disabled={!pagination.hasPrevPage}
					aria-label='Go to previous page'>
					<ChevronLeft className='h-4 w-4' />
				</Button>
			</div>
			<div className='flex items-center space-x-1'>{renderPageNumbers()}</div>
			<div className='flex items-center space-x-2'>
				<Button
					variant='outline'
					size='icon'
					onClick={() => onPageChange(currentPage + 1)}
					disabled={!pagination.hasNextPage}
					aria-label='Go to next page'>
					<ChevronRight className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					size='icon'
					onClick={() => onPageChange(totalPages)}
					disabled={!pagination.hasNextPage}
					aria-label='Go to last page'>
					<ChevronsRight className='h-4 w-4' />
				</Button>
			</div>
		</nav>
	);
}
