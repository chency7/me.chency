import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../../components/nav";
import { Card } from "../../components/card";
import { Article } from "./article";
import { Presentation } from "lucide-react";

export const revalidate = 60;

export default async function ProjectsPage() {
  const sorted = allProjects.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl md:space-y-16 md:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">项目</h2>
          <p className="mt-4 text-zinc-400">
            <Presentation className="inline-block mr-2 w-4" /> 工作中及生活中的一些项目
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          <Card>
            <Article project={sorted[0]} />
          </Card>
          <div className="flex flex-col gap-8 mx-auto">
            {sorted.slice(1, 3).map((project) => (
              <Card key={project.slug}>
                <Article project={project} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px bg-zinc-800 md:block" />

        <div className="grid grid-cols-1 gap-4 mx-auto md:grid-cols-3 lg:mx-0">
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
