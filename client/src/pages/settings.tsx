import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faBell, faPalette } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

// Profile form validation schema
const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// App settings form validation schema
const appSettingsSchema = z.object({
  darkMode: z.boolean().default(false),
  notifications: z.boolean().default(true),
  showCompleted: z.boolean().default(true),
  autoBreak: z.boolean().default(true)
});

type AppSettingsFormValues = z.infer<typeof appSettingsSchema>;

// Pomodoro settings form validation schema
const pomodoroSettingsSchema = z.object({
  focusDuration: z.number().min(5, "Focus duration must be at least 5 minutes").max(120, "Focus duration must be at most 120 minutes"),
  shortBreakDuration: z.number().min(1, "Short break must be at least 1 minute").max(30, "Short break must be at most 30 minutes"),
  longBreakDuration: z.number().min(5, "Long break must be at least 5 minutes").max(60, "Long break must be at most 60 minutes"),
  sessionsBeforeLongBreak: z.number().min(1, "Sessions must be at least 1").max(10, "Sessions must be at most 10")
});

type PomodoroSettingsFormValues = z.infer<typeof pomodoroSettingsSchema>;

const SettingsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "TechAvi",
      email: "techavi@example.com",
      firstName: "",
      lastName: ""
    }
  });

  // App settings form
  const appSettingsForm = useForm<AppSettingsFormValues>({
    resolver: zodResolver(appSettingsSchema),
    defaultValues: {
      darkMode: false,
      notifications: true,
      showCompleted: true,
      autoBreak: true
    }
  });

  // Pomodoro settings form
  const pomodoroForm = useForm<PomodoroSettingsFormValues>({
    resolver: zodResolver(pomodoroSettingsSchema),
    defaultValues: {
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      sessionsBeforeLongBreak: 4
    }
  });

  // Handle profile form submission
  const onProfileSubmit = async (data: ProfileFormValues) => {
    // In a real app, you would save these settings to backend
    console.log("Profile data:", data);
    
    // Show success message
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated."
    });
  };

  // Handle app settings form submission
  const onAppSettingsSubmit = async (data: AppSettingsFormValues) => {
    // In a real app, you would save these settings to backend
    console.log("App settings:", data);
    
    // Show success message
    toast({
      title: "Settings Updated",
      description: "Your application settings have been updated."
    });
  };

  // Handle pomodoro settings form submission
  const onPomodoroSubmit = async (data: PomodoroSettingsFormValues) => {
    // In a real app, you would save these settings to backend
    console.log("Pomodoro settings:", data);
    
    // Show success message
    toast({
      title: "Pomodoro Settings Updated",
      description: "Your pomodoro timer settings have been updated."
    });
  };

  const renderTabIcon = (tab: string) => {
    switch (tab) {
      case "profile":
        return <FontAwesomeIcon icon={faUser} />;
      case "app":
        return <FontAwesomeIcon icon={faCog} />;
      case "notifications":
        return <FontAwesomeIcon icon={faBell} />;
      case "appearance":
        return <FontAwesomeIcon icon={faPalette} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6`}>
            {!isMobile && (
              <Card className="w-1/4">
                <CardContent className="pt-6">
                  <TabsList className="flex flex-col items-start w-full space-y-1">
                    <TabsTrigger value="profile" className="justify-start w-full">
                      <span className="mr-2">{renderTabIcon("profile")}</span> Profile
                    </TabsTrigger>
                    <TabsTrigger value="app" className="justify-start w-full">
                      <span className="mr-2">{renderTabIcon("app")}</span> App Settings
                    </TabsTrigger>
                    <TabsTrigger value="pomodoro" className="justify-start w-full">
                      <span className="mr-2">{renderTabIcon("appearance")}</span> Pomodoro
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            )}

            {isMobile && (
              <TabsList className="flex justify-start space-x-2 mb-4 overflow-x-auto">
                <TabsTrigger value="profile">
                  <span className="mr-2">{renderTabIcon("profile")}</span> Profile
                </TabsTrigger>
                <TabsTrigger value="app">
                  <span className="mr-2">{renderTabIcon("app")}</span> App
                </TabsTrigger>
                <TabsTrigger value="pomodoro">
                  <span className="mr-2">{renderTabIcon("appearance")}</span> Pomodoro
                </TabsTrigger>
              </TabsList>
            )}

            <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
              {/* Profile Settings */}
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Manage your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Your email address
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit">Save Profile</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* App Settings */}
              <TabsContent value="app" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>App Settings</CardTitle>
                    <CardDescription>
                      Customize your application preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...appSettingsForm}>
                      <form onSubmit={appSettingsForm.handleSubmit(onAppSettingsSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          <FormField
                            control={appSettingsForm.control}
                            name="darkMode"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Dark Mode</FormLabel>
                                  <FormDescription>
                                    Enable dark mode for the application
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={appSettingsForm.control}
                            name="notifications"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Notifications</FormLabel>
                                  <FormDescription>
                                    Receive notifications for tasks and sessions
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={appSettingsForm.control}
                            name="showCompleted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Show Completed Tasks</FormLabel>
                                  <FormDescription>
                                    Display completed tasks in task lists
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={appSettingsForm.control}
                            name="autoBreak"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Auto-Start Breaks</FormLabel>
                                  <FormDescription>
                                    Automatically start breaks in Pomodoro timer
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit">Save Settings</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pomodoro Settings */}
              <TabsContent value="pomodoro" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pomodoro Settings</CardTitle>
                    <CardDescription>
                      Customize your pomodoro timer preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...pomodoroForm}>
                      <form onSubmit={pomodoroForm.handleSubmit(onPomodoroSubmit)} className="space-y-4">
                        <FormField
                          control={pomodoroForm.control}
                          name="focusDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Focus Duration (minutes)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Length of each focus session
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={pomodoroForm.control}
                          name="shortBreakDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Short Break Duration (minutes)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Length of short breaks between focus sessions
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={pomodoroForm.control}
                          name="longBreakDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Long Break Duration (minutes)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Length of long breaks after completing multiple sessions
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={pomodoroForm.control}
                          name="sessionsBeforeLongBreak"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sessions Before Long Break</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Number of focus sessions before taking a long break
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit">Save Pomodoro Settings</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;