"use client";

import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../../components/nav";
import { Card } from "../../components/card";
import { Article } from "./article";
import { Presentation } from "lucide-react";

export const revalidate = 60;

export default function ProjectsPage() {
  console.log("allProjects", allProjects);

  const sorted = allProjects.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-16 md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">项目</h2>
          <p className="mt-4 text-zinc-400">
            <Presentation className="mr-2 inline-block w-4" /> 工作中及生活中的一些项目
          </p>
        </div>
        <div className="h-px w-full bg-zinc-800" />

        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <Article project={sorted[0]} />
          </Card>
          <div className="mx-auto flex flex-col gap-8">
            {sorted.slice(1, 3).map((project) => (
              <Card key={project.slug}>
                <Article project={project} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden h-px w-full bg-zinc-800 md:block" />

        <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:mx-0">
          {sorted.slice(3).map((project) => (
            <Card key={project.slug}>
              <Article project={project} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
