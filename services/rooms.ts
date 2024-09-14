import { IResultDataDashboard } from "@/interfaces/dasboard";
import dbConnect from "../lib/dbConnect";
import { IRoom } from "@/interfaces/room";
import Room from "@/models/Room";

export const getRoomsByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const sooms: IRoom[] = await Room.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    const parsedRooms: IResultDataDashboard[] = sooms.map(({ _id, name }) => {
      return {
        src: "https://archivos-cms.cinecolombia.com/images/_aliases/medium/0/8/0/8/18080-3-esl-CO/17.png",
        label: name,
        href: `/rooms/${_id}`,
      };
    });
    return parsedRooms;
  } catch (error: any) {
    return [];
  }
};
