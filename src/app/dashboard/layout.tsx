import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <SideBar />
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8 bg-white mx-5 rounded-md flex-1 h-full p-5">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
