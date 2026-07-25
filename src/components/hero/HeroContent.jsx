import React from "react";
import Cta from "./Cta";
import Stats from "./Stats";
import { CheckCheck, Clock3, Users } from "lucide-react";

const HeroContent = ({
  head,
  title1,
  title2,
  subtitle,
  para,
  showCta = true,
  showStats = true,
}) => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      {/* Section Label */}
      <div>
        <p className="text-xl font-semibold uppercase tracking-[0.18em] text-[#F57C3D]">
          {head}
        </p>
      </div>

      {/* Heading */}
      <div className="flex flex-col">
        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-[-0.04em] text-zinc-100 md:text-6xl lg:text-7xl">
          {title1}
          <br />
          {title2}{" "}
          <span className="text-[#F57C3D]">
            {subtitle}
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-xl leading-9 text-zinc-400">
          {para}
        </p>
      </div>

      {/* CTA */}
      {showCta && (
        <div className="mt-6">
          <Cta />
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <>
          <div className="mt-8 border-b border-white/10"></div>

          <div className="flex flex-wrap gap-8 py-6">
            <Stats
              icon={Users}
              value="1,200+"
              label="Projects Logged"
            />

            <Stats
              icon={Clock3}
              value="12 hrs"
              label="Avg. Response"
            />

            <Stats
              icon={CheckCheck}
              value="98%"
              label="Client Satisfaction"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HeroContent;