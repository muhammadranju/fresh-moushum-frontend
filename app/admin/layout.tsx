import Sidebar from "@/components/admin/Sidebar";
import AdminNavbar from "@/components/admin/Navbar";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <AdminNavbar />
          <main className="flex-1 p-8 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
