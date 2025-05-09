
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, id);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-admin p-3 rounded-full">
              <User className="text-white h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Login to access the Heritage Explorer Admin Panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  placeholder="Enter your username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Admin ID</Label>
                <Input 
                  id="id" 
                  placeholder="Enter your admin ID"
                  value={id} 
                  onChange={(e) => setId(e.target.value)} 
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full bg-admin hover:bg-admin-light" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center w-full text-sm">
            <p>Use mock credentials: <strong>admin / admin123</strong></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
