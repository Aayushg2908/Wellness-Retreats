import { RetreatType } from "@/types";

const RetreatCard = ({ retreat }: { retreat: RetreatType }) => {
  return (
    <div className="h-[440px] w-full bg-stone-300 rounded-lg p-4 flex flex-col shadow-lg">
      <img
        src={retreat.image}
        alt="banner-image"
        className="w-full h-[200px] rounded-lg object-cover"
      />
      <h1 className="text-xl mt-4 font-medium">{retreat.title}</h1>
      <span>{retreat.description}</span>
      <span className="mt-4">
        Date: {new Date(retreat.date).toDateString().replace(" ", ", ")}
      </span>
      <span>Location: {retreat.location}</span>
      <span>Price: ${retreat.price}</span>
    </div>
  );
};

export default RetreatCard;
