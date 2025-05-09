
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Check, X } from 'lucide-react';

const SubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSubmissionById, approveSubmission, rejectSubmission } = useAdmin();
  const submission = getSubmissionById(id || '');

  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  if (!submission) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <h2 className="text-xl font-bold">Submission not found</h2>
              <p className="text-muted-foreground mt-2">
                The submission you're looking for doesn't exist
              </p>
              <Button 
                variant="default" 
                className="mt-4"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleApprove = () => {
    approveSubmission(submission.id);
    navigate('/dashboard');
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      rejectSubmission(submission.id, rejectionReason);
      setShowRejectDialog(false);
      navigate('/dashboard');
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{submission.title}</h1>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Submission Details</CardTitle>
                <Badge variant={getBadgeVariant(submission.status) as any}>
                  {submission.status}
                </Badge>
              </div>
              <CardDescription>
                Submitted on {formatDate(submission.submittedAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Location</h3>
                <p>{submission.location}</p>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p>{submission.description}</p>
              </div>
              {submission.status === 'rejected' && submission.rejectionReason && (
                <div>
                  <h3 className="font-medium text-destructive">Rejection Reason</h3>
                  <p className="text-muted-foreground">{submission.rejectionReason}</p>
                </div>
              )}
            </CardContent>
            
            {submission.status === 'pending' && (
              <CardFooter className="flex justify-between space-x-2">
                <Button onClick={handleApprove} className="flex-1" variant="outline">
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button 
                  onClick={() => setShowRejectDialog(true)} 
                  variant="destructive" 
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={submission.imageUrl} 
                alt={submission.title} 
                className="w-full rounded-md object-cover" 
                style={{ maxHeight: '400px' }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Submitter Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p>{submission.userName}</p>
              </div>
              <div>
                <h3 className="font-medium">User ID</h3>
                <p>{submission.userId}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">Submission ID</h3>
                <p className="font-mono text-sm">{submission.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this submission. This information will be shared with the submitter.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionDetail;
