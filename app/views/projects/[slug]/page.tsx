import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  const _project = {
    url: "",
    title: "",
    description: "",
    repository: "",
    date: "",
  };

  if (!project) {
    notFound();
  } else {
    _project.url = project.url || "";
    _project.title = project.title || "";
    _project.description = project.description || "";
    _project.repository = project.repository || "";
    _project.date = project.date || "";
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header project={_project} />
      <article className="prose prose-zinc prose-quoteless mx-auto px-4 py-12">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
