import React from "react";
import AboutContent from "@/app/ui/customers/about/AboutContent";
import TechnologiesSection from "@/app/ui/customers/about/TechnologiesSection";
import TeamSection from "@/app/ui/customers/about/Team/TeamSection";

export default async function AboutPage() {
  return (
    <div className="container mx-auto">
      <AboutContent />
      <TechnologiesSection />
      <TeamSection />
    </div>
  );
}
