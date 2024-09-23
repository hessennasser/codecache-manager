import MainSnippetsPage from '@/components/pages/MainSnippetsPage'

const snippets = [
  {
    id: 1,
    title: "React useEffect Hook",
    description: "Example of using the useEffect hook in React",
    language: "javascript",
    tags: ["React", "Hooks"],
    code: "useEffect(() => {\n  // Effect code here\n  return () => {\n    // Cleanup code here\n  };\n}, []);",
    user: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
      username: "johndoe"
    },
    createdAt: "2024-09-20T12:00:00Z"
  },
  {
    id: 2,
    title: "Python List Comprehension",
    description: "Creating a new list based on existing list",
    language: "python",
    tags: ["Python", "Lists"],
    code: "new_list = [x for x in range(10) if x % 2 == 0]",
    user: {
      name: "Jane Smith",
      avatar: "https://github.com/hessennasser.png",
      username: "janesmith"
    },
    createdAt: "2024-09-21T14:30:00Z"
  },
]

export default function SnippetsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : ''
  const selectedLanguage = typeof searchParams.language === 'string' ? searchParams.language : 'all'
  const selectedTag = typeof searchParams.tag === 'string' ? searchParams.tag : 'all'

  const filteredSnippets = snippets.filter(snippet =>
    (searchTerm === '' ||
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLanguage === 'all' || snippet.language === selectedLanguage) &&
    (selectedTag === 'all' || snippet.tags.includes(selectedTag))
  )

  return (
    <MainSnippetsPage filteredSnippets={filteredSnippets} searchTerm={searchTerm} selectedLanguage={selectedLanguage} selectedTag={selectedTag} />
  )
}