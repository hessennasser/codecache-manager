export interface User {
  name: string;
  avatar: string;
  username: string;
}

export interface Snippet {
  id: number;
  title: string;
  description: string;
  language: string;
  tags: string[];
  code: string;
  user: User;
  createdAt: string;
}

export interface SearchFormProps {
  initialSearchTerm: string;
  initialLanguage: string;
  initialTag: string;
}

export interface SnippetCardProps {
  snippet: Snippet;
}

export interface MainSnippetsPageProps {
  searchParams: {
    search?: string;
    language?: string;
    tag?: string;
  };
  snippets: Snippet[];
}