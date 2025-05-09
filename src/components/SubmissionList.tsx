
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/contexts/AdminContext';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type SubmissionListProps = {
  submissions: Submission[];
  type: 'pending' | 'approved' | 'rejected';
};

const SubmissionList = ({ submissions, type }: SubmissionListProps) => {
  const navigate = useNavigate();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (submissions.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            No {type} submissions found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.title}</TableCell>
                <TableCell>{submission.location}</TableCell>
                <TableCell>{submission.userName}</TableCell>
                <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(submission.status) as any}>
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/submission/${submission.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubmissionList;
