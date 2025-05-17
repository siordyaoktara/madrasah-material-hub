
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Dashboard" }: HeaderProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const showNotification = () => {
    toast({
      title: "Notification",
      description: "You have a new notification",
    });
  };

  return (
    <header className="p-4 md:px-6 border-b flex items-center justify-between h-16 bg-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SidebarTrigger>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={showNotification}
          className="relative"
        >
          <Calendar className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
