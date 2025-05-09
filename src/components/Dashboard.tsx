
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/contexts/AdminContext';
import { Inbox, CheckCheck, XCircle } from 'lucide-react';
import SubmissionList from './SubmissionList';

const Dashboard = () => {
  const { pendingSubmissions, approvedSubmissions, rejectedSubmissions } = useAdmin();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
            <p className="text-xs text-muted-foreground">
              Submissions awaiting review
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedSubmissions.length}</div>
            <p className="text-xs text-muted-foreground">
              Submissions published to site
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedSubmissions.length}</div>
            <p className="text-xs text-muted-foreground">
              Submissions not approved
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingSubmissions.length > 0 && (
              <span className="ml-1 rounded-full bg-admin px-2 py-0.5 text-xs text-white">
                {pendingSubmissions.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <SubmissionList submissions={pendingSubmissions} type="pending" />
        </TabsContent>
        
        <TabsContent value="approved">
          <SubmissionList submissions={approvedSubmissions} type="approved" />
        </TabsContent>
        
        <TabsContent value="rejected">
          <SubmissionList submissions={rejectedSubmissions} type="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
