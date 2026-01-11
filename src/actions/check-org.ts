import { db } from "@/lib/db";


export async function checkUserOrg(userId: string) {
  const org = await db.company.findUnique({
    where: { userId },
  });
  return !!org;
}