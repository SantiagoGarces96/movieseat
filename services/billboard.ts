"use server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { IBillboardResult, updateBillboardFromText } from "@/lib/billboard";
import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";

export const getBillboardList = async (): Promise<string[]> => {
  await requireAdmin();
  await dbConnect();
  const movies = await Movie.find(
    { billboardPosition: { $ne: null } },
    { title: 1 },
  ).sort({ billboardPosition: 1 });
  return movies.map(({ title }) => title);
};

export const updateBillboard = async (
  text: string,
): Promise<{
  success: boolean;
  message: string;
  results?: IBillboardResult[];
}> => {
  await requireAdmin();
  const parsed = z.string().min(1).max(100_000).safeParse(text);
  if (!parsed.success) {
    return { success: false, message: "El texto no es válido." };
  }

  try {
    await dbConnect();
    const { results, saved, failed, createdSessions } =
      await updateBillboardFromText(parsed.data);
    const left = results.filter(({ movieTitle }) => !movieTitle).length;
    return {
      success: true,
      message:
        `Cartelera actualizada: ${saved} películas y ${createdSessions} funciones nuevas.` +
        (left ? ` ${left} no coincidieron y quedaron por fuera.` : "") +
        (failed ? ` ${failed} no se pudieron guardar.` : ""),
      results,
    };
  } catch (error: any) {
    console.error(`Error in updateBillboard: ${error.message}`);
    return { success: false, message: error.message };
  }
};
