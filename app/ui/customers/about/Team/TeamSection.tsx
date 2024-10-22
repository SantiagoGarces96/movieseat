import { getTeamData } from "./useTeamData";
import TeamCard from "./TeamCard";

const TeamSection = () => {
  const teamData = getTeamData();

  return (
    <section className="mx-auto p-6 sm:w-full hd:w-3/4 fhd:w-2/3">
      <h1 className="text-center text-4xl font-bold">Nuestro Equipo</h1>
      <div className="mx-auto my-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {teamData.map((member, index) => (
          <TeamCard
            key={index}
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
