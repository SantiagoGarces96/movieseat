import Image from "next/image";
import { FaGithub, FaGitlab, FaLinkedin } from "react-icons/fa";

interface TeamCardProps {
  urls: {
    linkedin: string;
    github: string;
    gitlab?: string;
  };
  role: string;
  name: string;
  photo: string;
  skills: string;
}

const TeamCard = ({ urls, role, name, photo, skills }: TeamCardProps) => {
  const socialLinks = [
    { label: "LinkedIn", href: urls.linkedin, Icon: FaLinkedin },
    { label: "GitHub", href: urls.github, Icon: FaGithub },
    { label: "GitLab", href: urls.gitlab, Icon: FaGitlab },
  ];

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-ink-900 p-6 sm:flex-row md:p-8">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-ink-800">
        <Image
          src={photo}
          alt={`Foto de ${name}`}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold tracking-tight">{name}</h3>
        <p className="mt-0.5 text-sm font-medium text-gold">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{skills}</p>
        <div className="mt-4 flex gap-4">
          {socialLinks.map(
            ({ label, href, Icon }) =>
              href && (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de ${name}`}
                  className="ms-link text-muted"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ),
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
