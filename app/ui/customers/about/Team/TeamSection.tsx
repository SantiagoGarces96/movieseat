import { getTeamData } from "./useTeamData";
import TeamCard from "./TeamCard";

const TeamSection = () => {
  const teamData = getTeamData();

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        Nuestro equipo
      </h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {teamData.map((member) => (
          <TeamCard
            key={member.name}
            role={member.role}
            name={member.name}
            photo={member.photo}
            skills={member.skills}
            urls={member.urls}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
