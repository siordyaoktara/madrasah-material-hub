
import { Book, Calendar, Home, Settings, User, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Students",
    path: "/students",
    icon: Users,
  },
  {
    title: "Curriculum",
    path: "/curriculum",
    icon: Book,
  },
  {
    title: "Prayer Times",
    path: "/prayer-times",
    icon: Calendar,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground font-semibold text-sm">IS</span>
          </div>
          <div>
            <h3 className="font-bold text-sidebar-foreground">Islamic School</h3>
            <p className="text-xs text-sidebar-foreground/80">Academic System</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={currentPath === item.path}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-4 w-4 text-sidebar-accent-foreground" />
          </div>
          <div>
            <p className="text-xs text-sidebar-foreground/80">Logged in as</p>
            <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
