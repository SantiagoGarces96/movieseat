"use server";
import { requireAdmin } from "@/lib/auth";
import {
  IDashboardResponse,
  IResultDataDashboard,
} from "@/interfaces/dasboard";
import { IUser } from "@/interfaces/user";
import User from "@/models/User";
import dbConnect from "../lib/dbConnect";
import { userRole } from "@/types/user";
import {
  formatDashboardDate,
  pageInfo,
  readTableParams,
} from "@/utils/dashboardQuery";
import { escapeRegex } from "@/utils/escapeRegex";

export const getUsersByQuery = async (
  query: string,
): Promise<IResultDataDashboard[]> => {
  await requireAdmin();
  if (!query) {
    return [];
  }
  await dbConnect();
  try {
    const users: IUser[] = await User.find(
      {
        $or: [
          { name: { $regex: escapeRegex(query), $options: "i" } },
          { email: { $regex: escapeRegex(query), $options: "i" } },
        ],
      },
      { name: 1, lastName: 1, email: 1 },
    ).limit(5);
    const parsedUsers: IResultDataDashboard[] = users.map(
      ({ _id, name, lastName, email }) => {
        return {
          src: "/images/avatar.webp",
          label: `${name} ${lastName}`,
          href: `/dashboard/users?tableQuery=${encodeURIComponent(email)}`,
        };
      },
    );
    return parsedUsers;
  } catch (error: any) {
    console.error(`Error in getUsersByQuery function: ${error.message}`);
    return [];
  }
};

export const getUsers = async (
  page: string,
  limit: string,
  query: string,
  sortBy: string,
  order: string,
): Promise<IDashboardResponse> => {
  await requireAdmin();
  await dbConnect();
  const { pageSize, requestedPage, sortField, sortOrder } = readTableParams(
    { page, limit, sortBy, order },
    ["name", "email", "role", "createdAt"],
  );
  const search = escapeRegex(query.trim());
  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  try {
    const totalResults = await User.countDocuments(filter);
    const info = pageInfo(requestedPage, pageSize, totalResults);
    const users = await User.find(filter, {
      name: 1,
      lastName: 1,
      email: 1,
      role: 1,
      tickets: 1,
      createdAt: 1,
    })
      .sort({ [sortField]: sortOrder, _id: 1 })
      .skip(info.skip)
      .limit(pageSize)
      .lean<IUser[]>();
    return {
      results: users.map((user) => ({
        _id: String(user._id),
        name: `${user.name} ${user.lastName}`,
        email: user.email,
        role: user.role === userRole.ADMIN ? "Administrador" : "Cliente",
        tickets: String(user.tickets?.length ?? 0),
        createdAt: formatDashboardDate(user.createdAt),
      })),
      page: info.page,
      totalPages: info.totalPages,
      totalResults,
    };
  } catch (error: any) {
    console.error(`Error in getUsers function: ${error.message}`);
    return { results: [], page: 1, totalPages: 0, totalResults: 0 };
  }
};
