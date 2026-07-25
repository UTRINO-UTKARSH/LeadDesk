import { Users } from "lucide-react";

const Stats = ({ icon: Icon, value, label }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex w-fit p-4 items-center justify-center rounded-full bg-white/4 border border-white/5">
        <Icon
          className="w-fit p-0.5 text-gray-300"
          strokeWidth={1.8}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-semibold tracking-tight text-zinc-100">
          {value}
        </span>
        <span className="text-sm whitespace-pre-line text-zinc-400">
          {label}
        </span>
      </div>
    </div>
  );
};

export default Stats;