import { HeartCrack } from "lucide-react";

export interface SomethingWentWrongProps {
  error?: unknown;
}

const SomethingWentWrong = ({ error }: SomethingWentWrongProps) => {
  if (!error) return null;

  console.error(error);

  return (
    <section className="flex flex-col items-center gap-y-1">
      <HeartCrack />
      <p className="text-center">
        Something went wrong, <br /> please try again later.
      </p>
    </section>
  );
};

export default SomethingWentWrong;
