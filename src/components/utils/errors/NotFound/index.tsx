import { CircleQuestionMark } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center gap-y-1">
      <CircleQuestionMark />
      <p className="text-center">Nothing found.</p>
    </section>
  );
};

export default NotFound;
