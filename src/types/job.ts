export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  type: "full-time" | "part-time" | "contract" | "remote";
  posted: string;
  applied: boolean;
  match: number; // Match percentage 0-100
}

export interface AIGeneratedContent {
  id: string;
  jobId: string;
  resume: {
    summary: string;
    highlights: string[];
    tailoredSkills: string[];
  };
  coverLetter: {
    content: string;
    keyPoints: string[];
  };
  improvements: {
    type: "addition" | "modification" | "emphasis";
    section: string;
    suggestion: string;
    reason: string;
  }[];
}

export interface UserProgress {
  dailyGoal: number;
  applicationsToday: number;
  totalApplications: number;
  completionRate: number;
  lastUpdated: string;
}