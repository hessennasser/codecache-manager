'use client'

import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFormProps {
  initialSearchTerm: string
  initialLanguage: string
  initialTag: string
}

export function SearchForm({ initialSearchTerm, initialLanguage, initialTag }: SearchFormProps) {
  const router = useRouter()

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/snippets?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <div className="flex-1">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search snippets..."
          defaultValue={initialSearchTerm}
          onChange={(e) => updateQuery('search', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="language">Language</Label>
        <Select defaultValue={initialLanguage} onValueChange={(value) => updateQuery('language', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="csharp">C#</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tag">Tag</Label>
        <Select defaultValue={initialTag} onValueChange={(value) => updateQuery('tag', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tags</SelectItem>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="Hooks">Hooks</SelectItem>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="Lists">Lists</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}