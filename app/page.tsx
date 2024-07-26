import { getRetreats } from "@/actions/main";
import FilterSection from "@/components/filter-section";
import Pagination from "@/components/pagination";
import RetreatCard from "@/components/retreat-card";
import { RetreatType } from "@/types";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    title: string;
    location: string;
    type: string;
    page: string;
  };
}) {
  const data = await getRetreats(searchParams);

  return (
    <main className="p-5">
      {/* Banner section */}
      <section className="w-full h-[400px] bg-stone-300 rounded-lg p-4 shadow-md flex flex-col">
        <img
          src="https://cdn.midjourney.com/a287f9bc-d0fb-4e78-a0fa-e8136d3c408a/0_0.jpeg"
          alt="banner-image"
          className="w-full h-[290px] rounded-lg object-cover"
        />
        <h1 className="text-xl mt-2 font-medium">Yoga for Stress Relief</h1>
        <span>
          A weekend retreat focused on yoga and meditation to relieve stress.
        </span>
      </section>

      {/* Filter section */}
      <FilterSection />

      {/* All Retreats */}
      <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((retreat: RetreatType) => (
          <RetreatCard retreat={retreat} key={retreat.id} />
        ))}
      </div>

      {/* Pagination section */}
      <Pagination hasNext={data.length === 3} />
    </main>
  );
}
