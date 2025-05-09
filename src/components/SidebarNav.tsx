
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ListTodo, Check, X } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const SidebarNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pendingSubmissions, approvedSubmissions, rejectedSubmissions } = useAdmin();

  const menuItems = [
    {
      title: 'Pending',
      icon: ListTodo,
      url: '/dashboard?tab=pending',
      count: pendingSubmissions.length,
      active: location.pathname === '/dashboard' && (location.search.includes('tab=pending') || !location.search),
    },
    {
      title: 'Approved',
      icon: Check,
      url: '/dashboard?tab=approved',
      count: approvedSubmissions.length,
      active: location.pathname === '/dashboard' && location.search.includes('tab=approved'),
    },
    {
      title: 'Rejected',
      icon: X,
      url: '/dashboard?tab=rejected',
      count: rejectedSubmissions.length,
      active: location.pathname === '/dashboard' && location.search.includes('tab=rejected'),
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Submissions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={item.active}
                    onClick={() => navigate(item.url)}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {item.count > 0 && (
                      <span className="ml-auto bg-admin/10 text-admin px-1.5 py-0.5 rounded-full text-xs font-medium">
                        {item.count}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
