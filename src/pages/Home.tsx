import { Hero } from '@/components/hero/Hero';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { SolutionsIndustries } from '@/components/sections/SolutionsIndustries';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { WhyNexverr } from '@/components/sections/WhyNexverr';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';
import { organizationJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

/**
 * Eight blocks, in the order a visitor forms questions:
 * who are you → what do you build → is it for a business like mine →
 * have you built it → can I trust you → let's talk.
 */
export default function Home() {
  useSeo(routeSeo.home);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <WhatWeBuild />
      <SolutionsIndustries />
      <SelectedWork />
      <WhyNexverr />
      <StartYourProject />
    </>
  );
}
