import Image from "next/image";

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
  return (
    <article className="flex h-full w-full flex-col items-start justify-between p-4">
      <div className="relative w-full rounded-lg bg-white">
        <h3 className="text-[9px] font-semibold text-gray-500 md:text-sm">
          {role}
        </h3>
        <h2 className="text-2xl font-bold text-black">{name}</h2>

        <div className="relative mb-8 mt-4 h-[25vh] md:h-[40vh] hd:h-[50vh]">
          <Image
            className="h-full w-full shadow-lg"
            src={photo}
            alt={name}
            fill
            style={{
              objectFit: "cover",
              filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))",
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
        </div>

        <p className="text-sm leading-relaxed text-gray-700">{skills}</p>

        {/* Enlaces a redes sociales */}
        <div className="mt-4 flex space-x-4">
          {urls.linkedin && (
            <a href={urls.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-2xl hover:text-blue-600"></i>
            </a>
          )}
          {urls.github && (
            <a href={urls.github} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github text-2xl hover:text-gray-700"></i>
            </a>
          )}
          {urls.gitlab && (
            <a href={urls.gitlab} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-gitlab text-2xl hover:text-orange-600"></i>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
