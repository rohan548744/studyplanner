import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "./contexts/user-context";

import Sidebar from "@/components/ui/sidebar";
import Dashboard from "@/pages/dashboard";
import Tasks from "@/pages/tasks";
import Schedule from "@/pages/schedule";
import Pomodoro from "@/pages/pomodoro";
import Subjects from "@/pages/subjects";
import Progress from "@/pages/progress";
import Settings from "@/pages/settings";
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Check if current route is login or register
  const isAuthPage = location === "/login" || location === "/register";
  
  // If on auth page, don't show sidebar
  if (isAuthPage) {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
  
  // Regular app layout with sidebar
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/pomodoro" component={Pomodoro} />
          <Route path="/subjects" component={Subjects} />
          <Route path="/progress" component={Progress} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route>
              <Router />
            </Route>
          </Switch>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
