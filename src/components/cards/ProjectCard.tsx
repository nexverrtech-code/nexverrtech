import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="nx-card group h-full">
      <Link to={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-surface-deep">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} — project preview`}
              className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            // Branded panel instead of a stock photo we do not have.
            <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,106,245,0.28),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(123,31,255,0.22),transparent_60%)]">
              <img
                src="/brand/nexverr-symbol.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 opacity-45"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {project.isSample ? (
            <span className="absolute left-3 top-3 rounded-full bg-amber-400/15 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-amber-300 ring-1 ring-inset ring-amber-300/30">
              Sample
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand-cyan">
            {project.industry}
          </p>

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[1.0625rem] font-extrabold leading-snug tracking-tight">
              {project.title}
            </h3>
            <ArrowUpRight
              className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-brand-cyan"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>

          {project.tags.length > 0 ? (
            <ul className="mt-auto flex flex-wrap gap-2 pt-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-hairline px-2.5 py-1 text-[0.6875rem] font-semibold text-ink-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
