import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import type { Project } from '@/data/projects';
import { track } from '@/lib/analytics';

interface ProjectCardProps {
  project: Project;
  /** Where the card is rendered, for analytics. */
  source?: string;
}

export function ProjectCard({ project, source = 'projects' }: ProjectCardProps) {
  return (
    <article className="nx-card group h-full">
      <Link
        to={`/projects/${project.slug}`}
        className="flex h-full flex-col"
        onClick={() => track('project_cta_click', { project: project.slug, source })}
      >
        <div className="relative overflow-hidden border-b border-hairline">
          <SmartImage
            src={project.screenshots?.[0]?.src}
            alt={project.screenshots?.[0]?.alt ?? `${project.client} project`}
            width={1280}
            height={720}
            className="transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
            frameClassName="rounded-none border-0"
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          />

          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[rgba(3,9,34,0.72)] px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink-muted backdrop-blur-sm">
            {project.projectType}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand-cyan">
            {project.industry}
            <span aria-hidden="true" className="text-ink-faint">
              /
            </span>
            <span className="inline-flex items-center gap-1 text-ink-faint">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {project.location}
            </span>
          </p>

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[1.125rem] font-extrabold leading-snug tracking-tight">
              {project.client}
            </h3>
            <ArrowUpRight
              className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-brand-cyan"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-cyan">
            View Case Study
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
