// app/admin/layout.tsx
import AdminLayout from "./admin_layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPageLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login"); // Redirect before rendering
  }
  return <AdminLayout>{children}</AdminLayout>;
}
