import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Sparkles, FileText, Mail, Send, Loader2 } from "lucide-react";
import { JobPosting, AIGeneratedContent } from "@/types/job";
import { toast } from "@/hooks/use-toast";

interface ApplicationReviewProps {
  job: JobPosting | null;
  aiContent: AIGeneratedContent | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobId: string) => void;
}

export const ApplicationReview = ({ 
  job, 
  aiContent, 
  isOpen, 
  onClose, 
  onSubmit 
}: ApplicationReviewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job || !aiContent) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(job.id);
    setIsSubmitting(false);
    onClose();
    
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} at ${job.company} has been successfully submitted.`,
      variant: "default",
    });
  };

  const getImprovementIcon = (type: string) => {
    switch (type) {
      case "addition":
        return "✨";
      case "modification": 
        return "🔄";
      case "emphasis":
        return "💪";
      default:
        return "✅";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Tailored Application for {job.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resume" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume
              </TabsTrigger>
              <TabsTrigger value="cover-letter" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Cover Letter
              </TabsTrigger>
              <TabsTrigger value="improvements" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Improvements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tailored Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground leading-relaxed bg-accent/10 p-4 rounded-lg border border-accent/20">
                    {aiContent.resume.summary}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiContent.resume.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-card-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tailored Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {aiContent.resume.tailoredSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cover-letter" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personalized Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                    <pre className="whitespace-pre-wrap text-card-foreground leading-relaxed font-sans">
                      {aiContent.coverLetter.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Points Addressed</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiContent.coverLetter.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-card-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI-Powered Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiContent.improvements.map((improvement, index) => (
                      <div key={index} className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{getImprovementIcon(improvement.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {improvement.section}
                              </Badge>
                              <Badge variant="secondary" className="text-xs capitalize">
                                {improvement.type}
                              </Badge>
                            </div>
                            <p className="font-medium text-card-foreground mb-1">
                              {improvement.suggestion}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {improvement.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>AI-optimized for {job.match}% job match</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-gradient-success hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};