import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaintenanceMode, toggleMaintenanceMode } from '../../redux/features/adminSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';

const Settings = () => {
  const dispatch = useDispatch();
  const { maintenanceMode, isMaintenanceLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getMaintenanceMode());
  }, [dispatch]);

  const handleMaintenanceToggle = async (checked) => {
    dispatch(toggleMaintenanceMode(checked));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
            <CardDescription>
              When enabled, the site will be in maintenance mode and only admins can access it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
                <span>Maintenance Mode</span>
                <span className="font-normal text-sm text-muted-foreground">
                  {maintenanceMode ? 'Site is currently in maintenance mode' : 'Site is currently active'}
                </span>
              </Label>
              <div className="flex items-center space-x-2">
                {isMaintenanceLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={handleMaintenanceToggle}
                  disabled={isMaintenanceLoading}
                />
              </div>
            </div>

            {maintenanceMode && (
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your site is currently in maintenance mode. Only administrators can access the site.
                  Regular users will see a maintenance page.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Settings;