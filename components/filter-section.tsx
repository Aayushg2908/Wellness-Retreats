"use client";

import { RETREATS_LOCATION, RETREATS_TYPE } from "@/lib/constants";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import qs from "query-string";

const FilterSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (title) {
        const url = qs.stringifyUrl(
          {
            url: "/",
            query: {
              title,
              location: searchParams.get("location"),
              type: searchParams.get("type"),
              page: searchParams.get("page"),
            },
          },
          { skipEmptyString: true, skipNull: true }
        );
        router.push(url);
      } else {
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [title]);

  return (
    <div className="w-full mt-6 flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:justify-between">
      <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-950 text-white hover:bg-blue-950 hover:text-white">
              Filter By Location <ChevronDown className="size-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] sm:w-[170px]">
            <DropdownMenuItem
              onSelect={() => router.push("/")}
              className="cursor-pointer bg-blue-950 text-white hover:!text-white hover:!bg-blue-950"
            >
              Clear All Filter
            </DropdownMenuItem>
            {RETREATS_LOCATION.map((type) => (
              <DropdownMenuItem
                key={type.label}
                onSelect={() => {
                  const url = qs.stringifyUrl(
                    {
                      url: "/",
                      query: {
                        title,
                        location: type.label,
                        type: searchParams.get("type"),
                        page: searchParams.get("page"),
                      },
                    },
                    { skipEmptyString: true, skipNull: true }
                  );
                  router.push(url);
                }}
                className="cursor-pointer"
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-950 text-white hover:bg-blue-950 hover:text-white">
              Filter By Type <ChevronDown className="size-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] sm:w-[150px]">
            <DropdownMenuItem
              onSelect={() => router.push("/")}
              className="cursor-pointer bg-blue-950 text-white hover:!text-white hover:!bg-blue-950"
            >
              Clear All Filter
            </DropdownMenuItem>
            {RETREATS_TYPE.map((type) => (
              <DropdownMenuItem
                key={type.label}
                onSelect={() => {
                  const url = qs.stringifyUrl(
                    {
                      url: "/",
                      query: {
                        title,
                        location: searchParams.get("location"),
                        type: type.label,
                        page: searchParams.get("page"),
                      },
                    },
                    { skipEmptyString: true, skipNull: true }
                  );
                  router.push(url);
                }}
                className="cursor-pointer"
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search Retreats By Title"
        className="w-full sm:w-[250px] border border-blue-950 !placeholder-slate-200 bg-blue-950 text-white"
      />
    </div>
  );
};

export default FilterSection;
