import { BriefcaseBusiness, Folder, Hexagon, ArrowRight} from "lucide-react";

const entries = [
    {
        id: 1,
        icon: BriefcaseBusiness,
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-400",
        name: "Priya M.",
        project: "Shopify rebuild",
        status: "New",
        statusColor: "bg-orange-400",
        statusText: "text-orange-400",
        time: "2 min ago",
    },
    {
        id: 2,
        icon: Folder,
        iconBg: "bg-violet-500/10",
        iconColor: "text-violet-400",
        name: "Daniel O.",
        project: "Landing page",
        status: "Contacted",
        statusColor: "bg-orange-400",
        statusText: "text-orange-400",
        time: "1 day ago",
    },
    {
        id: 3,
        icon: Hexagon,
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-400",
        name: "Harvest & Co.",
        project: "Brand refresh",
        status: "Closed",
        statusColor: "bg-emerald-400",
        statusText: "text-emerald-400",
        time: "3 days ago",
    },
];

const HeroLeft = () => {
    return (
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#11161D] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

            <div className="border-b border-white/5 px-8 py-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Recent Entries
                </h3>
            </div>

            {entries.map((entry) => {
                const Icon = entry.icon;

                return (
                    <div
                        key={entry.id}
                        className="flex items-center justify-between border-b border-white/5 px-8 py-6 transition-all duration-300 hover:bg-white/2"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full ${entry.iconBg}`}
                            >
                                <Icon
                                    size={20}
                                    className={entry.iconColor}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>
                                <h4 className="text-lg font-medium text-zinc-100">
                                    {entry.name}
                                </h4>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {entry.project}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div
                                className={`flex items-center justify-end gap-2 text-sm font-medium ${entry.statusText}`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${entry.statusColor}`}
                                ></span>

                                {entry.status}
                            </div>

                            <p className="mt-2 text-xs text-zinc-500">
                                {entry.time}
                            </p>
                        </div>
                    </div>
                );
            })}

            <button className="group flex items-center gap-2 px-8 py-6 text-sm font-medium text-zinc-300 transition hover:text-white">
                View all entries

                <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </button>
        </div>
    );
};

export default HeroLeft;