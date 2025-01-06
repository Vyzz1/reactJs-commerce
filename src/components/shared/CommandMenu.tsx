import { type DialogProps } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import useFetchData from "@/hooks/useFetchData";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { PiSneakerThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const deboundValue = useDebounce(search, 500);

  const { data: products, error } = useFetchData(
    `product/search?name=${deboundValue}`,
    deboundValue,
    "normal",
    deboundValue.length > 2
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search products ...</span>
        <span className="inline-flex lg:hidden">Type product name</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onValueChange={(value) => setSearch(value)}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {error && <p>Error</p>}
            {products?.map((product: Product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => {
                  setOpen(false);
                  setSearch("");

                  navigate(`/product/${product.id}`);
                }}
              >
                <PiSneakerThin className="mr-2 h-4 w-4" />
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
