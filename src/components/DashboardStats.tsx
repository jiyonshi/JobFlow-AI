import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Send, TrendingUp, Calendar } from "lucide-react";
import { UserProgress } from "@/types/job";

interface DashboardStatsProps {
  progress: UserProgress;
}

export const DashboardStats = ({ progress }: DashboardStatsProps) => {
  const progressPercentage = (progress.applicationsToday / progress.dailyGoal) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">
            {progress.applicationsToday}/{progress.dailyGoal}
          </div>
          <div className="mt-2">
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.max(0, progress.dailyGoal - progress.applicationsToday)} applications to go
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Applications</CardTitle>
          <Send className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">
            {progress.applicationsToday}
          </div>
          <p className="text-xs text-muted-foreground">
            Applications submitted today
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          <TrendingUp className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">
            {progress.totalApplications}
          </div>
          <p className="text-xs text-muted-foreground">
            All-time applications
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Calendar className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">
            {progress.completionRate}%
          </div>
          <p className="text-xs text-muted-foreground">
            Goals achieved this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};