import { CircleQuestionMark } from "lucide-react";

const NoUserReviews = () => {
  return (
    <section className="flex flex-col items-center gap-y-1">
      <CircleQuestionMark />
      <p className="text-center">No reviews yet.</p>
    </section>
  );
};

export default NoUserReviews;
