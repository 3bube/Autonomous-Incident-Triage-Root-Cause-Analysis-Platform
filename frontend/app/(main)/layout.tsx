import Header from "@/components/dashboard/layout/header";
import Sidebar from "@/components/dashboard/layout/sidebar";
import Providers from "@/app/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="bg-[#0c141c] min-h-screen flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16">
          <Header />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 mt-16">
          {/* Sidebar */}
          <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 ml-64 overflow-auto">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
