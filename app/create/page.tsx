import SnippetForm from '@/components/shared/snippet/snippetForm';

export default function AddSnippetPage() {
	return (
		<div className='container mx-auto py-8'>
			<h1 className='text-3xl font-bold mb-6 text-center'>
				Create New Snippet
			</h1>
			<SnippetForm />
		</div>
	);
}
