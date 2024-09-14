import { IResultDataDashboard } from "@/interfaces/dasboard";
import { IUser } from "@/interfaces/user";
import User from "@/models/User";
import dbConnect from "../lib/dbConnect";

export const getUsersByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const users: IUser[] = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    const parsedUsers: IResultDataDashboard[] = users.map(({ name, role }) => {
      return {
        src: "https://avatars.githubusercontent.com/u/93413716?v=4&size=256",
        label: name,
      };
    });
    return parsedUsers;
  } catch (error: any) {
    return [];
  }
};
