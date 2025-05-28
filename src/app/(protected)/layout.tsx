import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(protected)/_components/app-sidebar";


const protectedLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    )
}
export default protectedLayout;