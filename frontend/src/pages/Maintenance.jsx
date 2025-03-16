import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Settings, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Maintenance = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-primary/20 animate-pulse" />
              <div className="relative bg-primary text-primary-foreground p-4 rounded-full">
                <Settings className="h-8 w-8 animate-spin-slow" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Site Under Maintenance
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're currently performing scheduled maintenance to improve your shopping experience.
                Our team is working hard to get everything back up and running.
              </p>
            </div>

            {/* Expected Time */}
            <div className="bg-muted/50 px-6 py-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Expected completion: <span className="font-medium text-foreground">30 minutes</span>
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 w-full max-w-md">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Need help? Contact support@bazaar.com</span>
              </div>

              {/* Admin Access */}
              {user?.role === 'admin' && (
                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/settings" className="flex items-center justify-center gap-2">
                      Access Admin Panel
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute -inset-x-1/2 top-0 h-px w-[200%] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute -inset-y-1/2 right-0 w-px h-[200%] bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      </div>
    </div>
  );
};

export default Maintenance;