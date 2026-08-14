import { getInitials, type TeamMember } from '@/data/team';

interface TeamCardProps {
  member: TeamMember;
}

/** Name and role only — the profile supplies nothing else, so nothing else is shown. */
export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="nx-card h-full p-6 text-center sm:p-7">
      <div className="mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-full ring-1 ring-inset ring-white/10">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="grid h-full w-full place-items-center bg-brand-gradient-soft text-lg font-extrabold tracking-wider text-brand-cyan">
            {getInitials(member.name)}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-base font-extrabold tracking-tight text-white">{member.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{member.role}</p>
    </article>
  );
}
