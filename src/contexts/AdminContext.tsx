
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type Submission = {
  id: string;
  title: string;
  location: string;
  description: string;
  userName: string;
  userId: string;
  imageUrl: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
};

type AdminUser = {
  username: string;
  id: string;
  name: string;
};

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, id: string) => Promise<boolean>;
  logout: () => void;
  user: AdminUser | null;
  submissions: Submission[];
  pendingSubmissions: Submission[];
  approvedSubmissions: Submission[];
  rejectedSubmissions: Submission[];
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string, reason: string) => void;
  getSubmissionById: (id: string) => Submission | undefined;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data for submissions
const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: 'Ancient Temple',
    location: 'Mysore, Karnataka',
    description: 'A 400-year old temple with intricate carvings depicting local mythology.',
    userName: 'Rahul Sharma',
    userId: 'user123',
    imageUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070',
    submittedAt: '2023-05-15T09:23:45Z',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Folk Dance Festival',
    location: 'Hampi, Karnataka',
    description: 'Annual folk dance celebration showcasing traditional art forms.',
    userName: 'Ananya Patel',
    userId: 'user456',
    imageUrl: 'https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?q=80&w=2070',
    submittedAt: '2023-05-14T14:12:30Z',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Traditional Rangoli Art',
    location: 'Bangalore, Karnataka',
    description: 'Elaborate rangoli made during Diwali celebrations.',
    userName: 'Priya Kumar',
    userId: 'user789',
    imageUrl: 'https://images.unsplash.com/photo-1605018588012-823a360b44d1?q=80&w=2070',
    submittedAt: '2023-05-13T10:45:22Z',
    status: 'approved',
  },
  {
    id: '4',
    title: 'Handloom Weaving',
    location: 'Hubli, Karnataka',
    description: 'Traditional silk weaving techniques passed down through generations.',
    userName: 'Vijay Reddy',
    userId: 'user101',
    imageUrl: 'https://images.unsplash.com/photo-1595511890410-0b3033221297?q=80&w=2070',
    submittedAt: '2023-05-12T16:33:10Z',
    status: 'rejected',
    rejectionReason: 'Image quality too low. Please upload a higher resolution image.',
  },
  {
    id: '5',
    title: 'Tribal Artifacts',
    location: 'Kodagu, Karnataka',
    description: 'Collection of tribal artifacts from the Western Ghats region.',
    userName: 'Meera Singh',
    userId: 'user202',
    imageUrl: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?q=80&w=2070',
    submittedAt: '2023-05-11T08:20:15Z',
    status: 'pending',
  }
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const { toast } = useToast();

  const pendingSubmissions = submissions.filter(sub => sub.status === 'pending');
  const approvedSubmissions = submissions.filter(sub => sub.status === 'approved');
  const rejectedSubmissions = submissions.filter(sub => sub.status === 'rejected');

  const login = async (username: string, id: string): Promise<boolean> => {
    // Mock authentication - in a real app, you would verify against a database
    if (username === 'admin' && id === 'admin123') {
      setIsAuthenticated(true);
      setUser({ username, id, name: 'Admin User' });
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Panel",
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid username or ID",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const approveSubmission = (id: string) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'approved', rejectionReason: undefined } : sub
      )
    );
    toast({
      title: "Submission Approved",
      description: "The content has been approved and will be published",
    });
  };

  const rejectSubmission = (id: string, reason: string) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'rejected', rejectionReason: reason } : sub
      )
    );
    toast({
      title: "Submission Rejected",
      description: "The content has been rejected",
    });
  };

  const getSubmissionById = (id: string) => {
    return submissions.find(sub => sub.id === id);
  };

  return (
    <AdminContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      user, 
      submissions,
      pendingSubmissions,
      approvedSubmissions,
      rejectedSubmissions,
      approveSubmission,
      rejectSubmission,
      getSubmissionById
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
