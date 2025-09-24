import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { DashboardStats } from "@/components/DashboardStats";
import { ApplicationReview } from "@/components/ApplicationReview";
import { GoalSetting } from "@/components/GoalSetting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, User, Settings } from "lucide-react";
import { mockJobs, mockAIContent, mockProgress } from "@/data/mockData";
import { JobPosting, UserProgress } from "@/types/job";

const Index = () => {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [progress, setProgress] = useState<UserProgress>(mockProgress);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleJobReview = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsReviewOpen(true);
    }
  };

  const handleApplicationSubmit = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    
    setProgress(prev => ({
      ...prev,
      applicationsToday: prev.applicationsToday + 1,
      totalApplications: prev.totalApplications + 1,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleGoalUpdate = (newGoal: number) => {
    setProgress(prev => ({
      ...prev,
      dailyGoal: newGoal,
      lastUpdated: new Date().toISOString()
    }));
  };

  const availableJobs = jobs.filter(job => !job.applied);
  const appliedJobs = jobs.filter(job => job.applied);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">JobFlow AI</h1>
                <p className="text-sm text-muted-foreground">Your AI-powered job application assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Welcome back, Alex
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard Stats */}
        <DashboardStats progress={progress} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Available Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Available Positions</h2>
                  <p className="text-muted-foreground">
                    {availableJobs.length} jobs matching your profile
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  AI-Matched
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onReview={handleJobReview}
                  />
                ))}
              </div>
            </div>

            {/* Applied Jobs */}
            {appliedJobs.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Applied Positions ({appliedJobs.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appliedJobs.map(job => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        onReview={handleJobReview}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GoalSetting 
              currentGoal={progress.dailyGoal}
              onGoalUpdate={handleGoalUpdate}
            />
          </div>
        </div>
      </div>

      {/* Application Review Modal */}
      <ApplicationReview
        job={selectedJob}
        aiContent={selectedJob ? mockAIContent[selectedJob.id] : null}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default Index;
