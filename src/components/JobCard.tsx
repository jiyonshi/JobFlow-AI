import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, DollarSign, Clock, CheckCircle } from "lucide-react";
import { JobPosting } from "@/types/job";

interface JobCardProps {
  job: JobPosting;
  onReview: (jobId: string) => void;
}

export const JobCard = ({ job, onReview }: JobCardProps) => {
  const getMatchColor = (match: number) => {
    if (match >= 90) return "success";
    if (match >= 80) return "warning";
    return "secondary";
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-muted-foreground font-medium">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getMatchColor(job.match)} className="font-medium">
              {job.match}% match
            </Badge>
            {job.applied && (
              <div className="flex items-center gap-1 text-success">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Applied</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{job.posted}</span>
          </div>
        </div>
        
        <p className="text-sm text-card-foreground line-clamp-2">{job.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {job.requirements.map((req, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {req}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={() => onReview(job.id)}
          disabled={job.applied}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="sm"
        >
          {job.applied ? "Already Applied" : "Review & Apply"}
        </Button>
      </CardFooter>
    </Card>
  );
};