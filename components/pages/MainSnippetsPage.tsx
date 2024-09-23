import React, { Suspense } from 'react'
import { SearchForm } from '../shared/snippet/SearchForm'
import { SnippetCard } from '../shared/snippet/SnippetCard'
import Link from 'next/link'
import { Snippet } from '@/types/snippet'

type Props = {
  searchTerm: string;
  selectedLanguage: string;
  selectedTag: string;
  filteredSnippets: Snippet[];
}

const MainSnippetsPage: React.FC<Props> = ({ searchTerm,
  selectedLanguage,
  selectedTag,

  filteredSnippets }) => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Code Snippets</h1>
      <Suspense fallback={<div>Loading search form...</div>}>
        <SearchForm
          initialSearchTerm={searchTerm}
          initialLanguage={selectedLanguage}
          initialTag={selectedTag}
        />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredSnippets.map((snippet) => (
          <Link key={snippet.id} href={`/snippets/${snippet.id}`} passHref>
            <SnippetCard snippet={snippet} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MainSnippetsPage