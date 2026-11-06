import React from "react";
import AboutContent from "@/app/ui/customers/about/AboutContent";
import ImageCredits from "@/app/ui/customers/about/ImageCredits";
import TechnologiesSection from "@/app/ui/customers/about/TechnologiesSection";
import TeamSection from "@/app/ui/customers/about/Team/TeamSection";

export default function AboutPage() {
  return (
    <div className="ms-container space-y-16 py-10 md:space-y-20 md:py-14">
      <AboutContent />
      <TechnologiesSection />
      <TeamSection />
      <ImageCredits />
    </div>
  );
}
