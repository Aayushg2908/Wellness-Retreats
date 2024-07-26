"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import qs from "query-string";

const Pagination = ({ hasNext }: { hasNext: boolean }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center mt-6 gap-x-4">
      <Button
        disabled={searchParams.get("page") ? false : true}
        className="bg-blue-950 text-white hover:!bg-blue-950 hover:!text-white"
        onClick={() => {
          const page = searchParams.get("page");
          // if page is greater than 2, then only subtract 1 from the page number otherwise redirect to the home page.
          if (page && parseInt(page) > 2) {
            const url = qs.stringifyUrl(
              {
                url: "/",
                query: {
                  page: parseInt(page) - 1,
                  location: searchParams.get("location"),
                  type: searchParams.get("type"),
                  title: searchParams.get("title"),
                },
              },
              { skipEmptyString: true, skipNull: true }
            );
            router.push(url);
          } else {
            const url = qs.stringifyUrl(
              {
                url: "/",
                query: {
                  location: searchParams.get("location"),
                  type: searchParams.get("type"),
                  title: searchParams.get("title"),
                },
              },
              { skipEmptyString: true, skipNull: true }
            );
            router.push(url);
          }
        }}
      >
        Previous
      </Button>
      <Button
        disabled={!hasNext}
        className="bg-blue-950 text-white hover:!bg-blue-950 hover:!text-white"
        onClick={() => {
          const page = searchParams.get("page");
          const url = qs.stringifyUrl(
            {
              url: "/",
              query: {
                // if page is not present, then set it to 2 otherwise increment the page number by 1.
                page: page ? parseInt(page) + 1 : 2,
                location: searchParams.get("location"),
                type: searchParams.get("type"),
                title: searchParams.get("title"),
              },
            },
            { skipEmptyString: true, skipNull: true }
          );
          router.push(url);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
