import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => (
  <header className="mb-8 md:mb-10">
    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
    {description && (
      <p className="mt-2 max-w-2xl text-base text-muted">{description}</p>
    )}
  </header>
);

export default PageHeader;
