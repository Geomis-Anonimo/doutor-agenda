import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignOutButton from "@/app/dashboard/components/sign-out-button";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session?.user) {
    redirect("/authentication/");
  }
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id)
  });
  if(clinics.length === 0) {
    redirect("/clinic-form/");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <SignOutButton />
    </div>
  )
}
export default DashboardPage;