import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/effects/Reveal';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { FaqSection } from '@/components/sections/FaqSection';
import { RelatedLinks } from '@/components/sections/RelatedLinks';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { NotFoundContent } from '@/components/sections/NotFoundContent';
import { getBlogPostBySlug, sortedBlogPosts } from '@/data/blog';
import { serviceMap } from '@/data/services';
import { industryMap } from '@/data/industries';
import { useSeo } from '@/hooks/useSeo';
import { blogPostSeo, notFoundSeo } from '@/lib/routeSeo';
import { formatDate } from '@/lib/utils';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getBlogPostBySlug(slug);

  const seo = useMemo(
    () => (post ? blogPostSeo(post) : { ...notFoundSeo, path: `/blog/${slug}` }),
    [post, slug],
  );

  useSeo(seo);

  if (!post) return <NotFoundContent />;

  const services = post.relatedServices.map((key) => serviceMap[key]).filter(Boolean);
  const solutions = (post.relatedSolutions ?? []).map((key) => industryMap[key]).filter(Boolean);
  const more = sortedBlogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden pb-10 pt-[calc(var(--nx-nav-height)+2.5rem)] lg:pt-[calc(var(--nx-nav-height)+4rem)]">
          <div
            aria-hidden="true"
            className="nx-grid-bg nx-mask-fade-b absolute inset-0 opacity-50"
          />
          <AmbientGlow className="-right-24 -top-32" tone="cyan" size={520} />

          <Container className="relative">
            <Breadcrumbs items={seo.breadcrumbs ?? []} className="mb-8" />

            <Reveal className="max-w-3xl">
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

              <h1 className="mt-6 text-section">{post.title}</h1>
              <p className="mt-6 max-w-prose text-lead text-ink-muted">{post.excerpt}</p>
            </Reveal>
          </Container>
        </header>

        <Container>
          <div className="grid gap-12 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-16 lg:py-12">
            <div className="max-w-prose">
              <Reveal className="flex flex-col gap-5 text-lead text-ink-muted">
                {post.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </Reveal>

              {post.sections.map((section) => (
                <Reveal key={section.heading} className="mt-12">
                  <h2 className="text-sub">{section.heading}</h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-4 text-lead text-ink-muted">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets ? (
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                          />
                          <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              ))}

              {post.takeaways && post.takeaways.length > 0 ? (
                <Reveal className="mt-14">
                  <div className="nx-card p-6 sm:p-8">
                    <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      The short version
                    </h2>
                    <ul className="mt-5 flex flex-col gap-3">
                      {post.takeaways.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.4375rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple"
                          />
                          <span className="text-sm font-semibold text-ink">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--nx-nav-height)+2rem)] lg:self-start">
              <Reveal className="flex flex-col gap-6">
                {services.length > 0 ? (
                  <div className="nx-card p-6">
                    <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      Related services
                    </h2>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={`/services/${service.slug}`}
                            className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {solutions.length > 0 ? (
                  <div className="nx-card p-6">
                    <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      Related solutions
                    </h2>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {solutions.map((industry) => (
                        <li key={industry.slug}>
                          <Link
                            to={`/solutions/${industry.slug}`}
                            className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                          >
                            {industry.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="nx-card p-6">
                  <h2 className="text-base font-extrabold tracking-tight">Working through this?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Describe the situation and we will tell you what we would do — including when
                    the answer is to buy something off the shelf.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-cyan transition-opacity duration-200 hover:opacity-80"
                  >
                    Talk to NEXVERR
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </article>

      <FaqSection id={`faq-${post.slug}`} faqs={post.faqs ?? []} title="Questions this raises" />

      {more.length > 0 ? (
        <RelatedLinks
          id="more-reading"
          title="More insights"
          links={more.map((item) => ({
            kind: item.category,
            label: item.title,
            to: `/blog/${item.slug}`,
            description: item.excerpt,
          }))}
        />
      ) : null}

      <StartYourProject source={`blog-${post.slug}`} />
    </>
  );
}
