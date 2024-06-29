"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const products = [
  { label: 'Laptop', value: 'laptop' },
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'Tablet', value: 'tablet' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Keyboard', value: 'keyboard' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Printer', value: 'printer' },
  { label: 'Headphones', value: 'headphones' },
  { label: 'Camera', value: 'camera' },
]


export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? products.find((product) => product.value === value)?.label
            : "Select products..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search products..." className="h-9" />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.value}
                  value={product.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {product.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === product.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
