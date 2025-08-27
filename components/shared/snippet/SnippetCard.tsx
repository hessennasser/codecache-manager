"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Highlight, themes } from "prism-react-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookmarkIcon, Copy, Check, Eye, Code } from "lucide-react";
import { Snippet } from "@/redux/features/snippets/types";
import { RootState } from "@/redux/store";
import {
  checkIfSnippetIsSaved,
  saveSnippet,
  unsaveSnippet,
} from "@/redux/features/snippets/savedSnippetsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { showToast } from "@/utils/toastUtils";

interface SnippetCardProps {
  snippet: Snippet;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(checkIfSnippetIsSaved(snippet.id))
        .unwrap()
        .then((data: { isSaved: boolean | ((prevState: boolean) => boolean); }) => setIsSaved(data.isSaved));
    }
  }, [dispatch, snippet.id, user]);

  const handleSave = async () => {
    if (!user) {
      showToast("info","Please login to save snippets");
      return;
    }

    try {
      if (isSaved) {
        await dispatch(unsaveSnippet(snippet.id)).unwrap();
      } else {
        await dispatch(saveSnippet(snippet.id)).unwrap();
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to save/unsave snippet:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(snippet.content)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const truncateDescription = (text: string, lines: number) => {
    const words = text.split(" ");
    const truncated = words.slice(0, lines * 10).join(" ");
    return truncated.length < text.length ? `${truncated}...` : truncated;
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{snippet.title}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Code className="w-4 h-4" />
            <span className="uppercase text-xs font-semibold">
              {snippet.programmingLanguage}
            </span>
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500 line-clamp-2">
          {truncateDescription(snippet.description || "", 2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div className="h-64 overflow-y-auto">
          <Highlight
            theme={themes.nightOwl}
            code={snippet.content}
            language={snippet.programmingLanguage}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} p-2 rounded-md`}
                style={{ ...style, overflow: "visible" }}
              >
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
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 w-full">
          <Avatar>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${snippet.user.firstName} ${snippet.user.lastName}.svg`}
              alt={snippet.userId}
            />
            <AvatarFallback>
              {snippet?.user?.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {snippet.user.username}
            </span>
            <span className="text-xs text-gray-500">
              {snippet.user.firstName + " " + snippet.user.lastName}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {new Date(snippet.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between w-full mt-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copySuccess ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
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
  );
};
