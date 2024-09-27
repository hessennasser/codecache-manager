import React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const test = [
  {
    id: 1,
    title: "title1",
  },
  {
    id: 1,
    title: "title1",
  },
  {
    id: 1,
    title: "title1",
  },
];

const MainSearch = () => {
  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <Button
              variant="secondary"
              className="relative h-8 w-full justify-start text-sm font-normal dark:border-gray-600 md:w-64 md:pr-12 hidden lg:inline-flex"
            >
              <Search className="mr-2 h-4 w-4 text-primary dark:text-white" />
              <span className="hidden lg:inline-flex text-primary dark:text-gray-200">
                Search Snippets...
              </span>
              <span className="inline-flex lg:hidden text-muted-foreground dark:text-gray-400">
                Search...
              </span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted dark:bg-gray-700 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <Search className="mr-2 h-4 w-4 text-primary dark:text-white block lg:hidden" />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"top"}
          className="!container bg-white dark:bg-black cursor-pointer"
        >
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
            <SheetDescription>Search for any snippet</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="search"
                placeholder="Search documentation..."
                className="col-span-4 dark:bg-gray-800 dark:text-white"
                autoFocus
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            {test.map((item, index) => (
              <Link href={`snippets/${item.id}`} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainSearch;
