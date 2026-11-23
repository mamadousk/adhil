import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { listTracking } from "@/lib/tracking-store";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

async function AdminContent() {
  const c = await cookies();
  const isAdmin = c.get("adhilix_admin")?.value === "adhilix_admin_session_ok_v1";
  const records = isAdmin ? await listTracking() : [];
  return isAdmin ? <AdminDashboard initialRecords={records} /> : <AdminLogin />;
}

export default function AdminPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <Suspense fallback={<div className="mx-auto max-w-md rounded-3xl border border-line bg-bg-elev p-8 text-sm text-fg-muted">Chargement...</div>}>
          <AdminContent />
        </Suspense>
      </div>
    </main>
  );
}
