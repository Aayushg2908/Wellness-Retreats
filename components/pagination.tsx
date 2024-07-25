"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

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
          if (page && parseInt(page) > 2) {
            if (searchParams.get("location")) {
              if (searchParams.get("type")) {
                router.push(
                  `/?page=${parseInt(page) - 1}&location=${searchParams.get(
                    "location"
                  )}&type=${searchParams.get("type")}`
                );
              } else {
                router.push(
                  `/?page=${parseInt(page) - 1}&location=${searchParams.get(
                    "location"
                  )}`
                );
              }
            }
          } else {
            if (searchParams.get("location")) {
              if (searchParams.get("type")) {
                router.push(
                  `/?location=${searchParams.get(
                    "location"
                  )}&type=${searchParams.get("type")}`
                );
              } else {
                router.push(`/?location=${searchParams.get("location")}`);
              }
            } else {
              router.push("/");
            }
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
          if (page) {
            if (searchParams.get("location")) {
              if (searchParams.get("type")) {
                router.push(
                  `/?page=${
                    parseInt(page ? page : "1") + 1
                  }&location=${searchParams.get(
                    "location"
                  )}&type=${searchParams.get("type")}`
                );
              } else {
                router.push(
                  `/?page=${
                    parseInt(page ? page : "1") + 1
                  }&location=${searchParams.get("location")}`
                );
              }
            }
          } else {
            if (searchParams.get("location")) {
              if (searchParams.get("type")) {
                router.push(
                  `/?page=2&location=${searchParams.get(
                    "location"
                  )}&type=${searchParams.get("type")}`
                );
              } else {
                router.push(
                  `/?page=2&location=${searchParams.get("location")}`
                );
              }
            } else {
              router.push("/?page=2");
            }
          }
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
