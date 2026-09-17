import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { Reveal } from '@/components/effects/Reveal';
import { sortedBlogPosts } from '@/data/blog';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';
import { itemListJsonLd } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export default function Blog() {
  const seo = useMemo(
    () => ({
      ...routeSeo.blog,
      schema: [
        ...routeSeo.blog.schema,
        itemListJsonLd('Articles by NEXVERR TECHNOLOGIES', sortedBlogPosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))),
      ],
    }),
    [],
  );

  useSeo(seo);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Straight answers to the questions asked before buying software"
        description="Short, practical pieces on the decisions businesses actually face — written to be useful whether or not you ever work with us."
        breadcrumbs={routeSeo.blog.breadcrumbs}
        tone="cyan"
      />

      <section className="nx-section-tight pt-0" aria-label="Articles">
        <Container>
          <ul className="flex flex-col gap-4">
            {sortedBlogPosts.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={Math.min(index, 6) * 0.05}>
                <article className="nx-card group h-full">
                  <Link to={`/blog/${post.slug}`} className="flex flex-col gap-4 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em]">
                      <span className="text-brand-cyan">{post.category}</span>
                      <span aria-hidden="true" className="text-ink-faint">
                        /
                      </span>
                      <time dateTime={post.publishedAt} className="text-ink-faint">
                        {formatDate(post.publishedAt)}
                      </time>
                      <span className="inline-flex items-center gap-1.5 text-ink-faint">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {post.readingMinutes} min read
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-6">
                      <h2 className="max-w-2xl text-[1.25rem] font-extrabold leading-snug tracking-tight sm:text-[1.4375rem]">
                        {post.title}
                      </h2>
                      <ArrowUpRight
                        className="mt-1 h-5 w-5 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-brand-cyan"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="max-w-prose text-sm leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 max-w-prose text-sm leading-relaxed text-ink-faint">
            New pieces are added when there is something worth saying. This page will never fill up
            with articles written for a search engine rather than a reader.
          </p>
        </Container>
      </section>

      <StartYourProject source="blog" />
    </>
  );
}
