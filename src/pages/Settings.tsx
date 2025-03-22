
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Globe, 
  Trash2 
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Language } from '@/translations/types';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!", {
      description: "Your changes have been applied."
    });
  };

  const handleDeleteAccount = () => {
    toast.error("Are you sure?", {
      description: "This action cannot be undone. Please contact support if you really want to delete your account.",
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  // Redirect if not logged in (this would typically be handled by a route guard)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{t('login')}</CardTitle>
              <CardDescription>
                {t('loginRequired')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.href = '/login'} className="w-full">
                {t('goToLogin')}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{t('settings')}</h1>
            <p className="text-muted-foreground">{t('manageSettings')}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 gap-2">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" /> 
                <span className="hidden md:inline">{t('account')}</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> 
                <span className="hidden md:inline">{t('security')}</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> 
                <span className="hidden md:inline">{t('notifications')}</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> 
                <span className="hidden md:inline">{t('preferences')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('profileInfo')}</CardTitle>
                  <CardDescription>
                    {t('updateProfile')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t('fullName')}</Label>
                      <Input id="fullName" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input id="email" defaultValue={userData.email} type="email" />
                    </div>
                  </div>
                  <Button onClick={handleSaveSettings}>{t('saveChanges')}</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">{t('dangerZone')}</CardTitle>
                  <CardDescription>
                    {t('deleteAccount')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t('deleteAccount')}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('password')}</CardTitle>
                  <CardDescription>
                    {t('changePassword')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t('newPassword')}</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button onClick={handleSaveSettings}>{t('updatePassword')}</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('notificationSettings')}</CardTitle>
                  <CardDescription>
                    {t('chooseNotifications')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">{t('emailNotifications')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('receiveNotifications')}
                      </p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">{t('marketingEmails')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('receivePromotions')}
                      </p>
                    </div>
                    <Switch id="marketingEmails" defaultChecked />
                  </div>
                  <Button onClick={handleSaveSettings}>{t('savePreferences')}</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('languageRegion')}</CardTitle>
                  <CardDescription>
                    {t('setLanguage')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">{t('language')}</Label>
                    <Select 
                      value={language}
                      onValueChange={(value) => setLanguage(value as Language)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSaveSettings}>{t('savePreferences')}</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
