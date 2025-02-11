import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";

export function Article({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <span className="drop-shadow-orange text-xs text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:text-white">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {`${Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date)
                )}---day`}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
        </div>
        <h2 className="z-20 font-display text-xl font-medium text-zinc-200 duration-1000 group-hover:text-white lg:text-3xl">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
}
