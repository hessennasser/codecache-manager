"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Highlight, themes } from "prism-react-renderer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookmarkIcon } from "lucide-react"

interface Snippet {
  id: number;
  title: string;
  description: string;
  language: string;
  tags: string[];
  code: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  createdAt: string;
}

interface SnippetCardProps {
  snippet: Snippet;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000) // Reset copy status after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription>{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Highlight
          theme={themes.nightOwl}
          code={snippet.code}
          language={snippet.language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} p-2 rounded-md overflow-x-auto`} style={style}>
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
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 w-full">
          <Avatar>
            <AvatarImage src={snippet.user.avatar} alt={snippet.user.name} />
            <AvatarFallback>{snippet.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{snippet.user.name}</span>
            <span className="text-xs text-gray-500">@{snippet.user.username}</span>
          </div>
          <span className="ml-auto text-xs text-gray-500">
            {new Date(snippet.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between w-full mt-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copySuccess ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant={isSaved ? "secondary" : "outline"}
            size="sm"
            onClick={handleSave}
          >
            <BookmarkIcon className="w-4 h-4 mr-2" />
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
