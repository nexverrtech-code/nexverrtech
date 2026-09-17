import { Hero } from '@/components/hero/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { SolutionsIndustries } from '@/components/sections/SolutionsIndustries';
import { SelectedProjects } from '@/components/sections/SelectedProjects';
import { WhyNexverr } from '@/components/sections/WhyNexverr';
import { StartYourProject } from '@/components/sections/StartYourProject';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';

/**
 * The homepage answers questions in the order a visitor forms them:
 * who are you → who trusts you → what do you build → is it for a business like
 * mine → have you built it → why you → let's talk.
 */
export default function Home() {
  useSeo(routeSeo.home);

  return (
    <>
      <Hero />
      <TrustedBy />
      <WhatWeBuild />
      <SolutionsIndustries />
      <SelectedProjects />
      <WhyNexverr />
      <StartYourProject />
    </>
  );
}
