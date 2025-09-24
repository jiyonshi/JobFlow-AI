import { JobPosting, AIGeneratedContent, UserProgress } from '@/types/job';

export const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$140k - $180k",
    description: "We're looking for a Senior Frontend Developer to join our growing team and help build the next generation of our web applications.",
    requirements: ["React", "TypeScript", "Node.js", "5+ years experience"],
    type: "full-time",
    posted: "2 days ago",
    applied: false,
    match: 92
  },
  {
    id: "2", 
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$120k - $160k",
    description: "Join our fast-growing startup and work on cutting-edge technology. We need someone who can work across the full stack.",
    requirements: ["React", "Python", "AWS", "3+ years experience"],
    type: "remote",
    posted: "1 day ago",
    applied: true,
    match: 87
  },
  {
    id: "3",
    title: "React Developer", 
    company: "Digital Agency Pro",
    location: "New York, NY",
    salary: "$100k - $130k",
    description: "Looking for a React developer to work on client projects. Great opportunity to work with diverse clients and technologies.",
    requirements: ["React", "JavaScript", "CSS", "2+ years experience"],
    type: "full-time",
    posted: "3 days ago", 
    applied: false,
    match: 89
  },
  {
    id: "4",
    title: "Frontend Engineer",
    company: "FinTech Solutions",
    location: "Austin, TX",
    salary: "$110k - $150k", 
    description: "Build intuitive financial applications that help millions of users manage their money better.",
    requirements: ["React", "TypeScript", "Testing", "4+ years experience"],
    type: "full-time",
    posted: "1 week ago",
    applied: false,
    match: 94
  },
  {
    id: "5",
    title: "UI/UX Developer",
    company: "Creative Studio",
    location: "Los Angeles, CA",
    salary: "$90k - $120k",
    description: "Work at the intersection of design and development, creating beautiful and functional user interfaces.",
    requirements: ["React", "CSS", "Figma", "Design Systems"],
    type: "full-time",
    posted: "5 days ago",
    applied: false,
    match: 78
  }
];

export const mockAIContent: Record<string, AIGeneratedContent> = {
  "1": {
    id: "ai-1",
    jobId: "1",
    resume: {
      summary: "Senior Frontend Developer with 5+ years of experience building scalable React applications. Expertise in TypeScript, modern JavaScript, and performance optimization.",
      highlights: [
        "Led frontend architecture for 3 major web applications serving 100k+ users",
        "Implemented React performance optimizations reducing load times by 40%",
        "Mentored 5 junior developers in modern frontend best practices"
      ],
      tailoredSkills: ["React", "TypeScript", "Performance Optimization", "Team Leadership", "Modern JavaScript"]
    },
    coverLetter: {
      content: "Dear TechCorp Inc. Hiring Team,\n\nI'm excited to apply for the Senior Frontend Developer position. With my 5+ years of React expertise and passion for building user-centric applications, I'm confident I can contribute significantly to your team's mission of creating next-generation web applications.\n\nIn my previous role, I led the frontend architecture for applications serving over 100,000 users, where I implemented performance optimizations that reduced load times by 40%. This experience aligns perfectly with TechCorp's focus on scalable, high-performance web solutions.\n\nI'm particularly drawn to TechCorp's innovative approach to web development and would love to contribute my expertise in React, TypeScript, and performance optimization to help drive your continued success.\n\nBest regards,\n[Your Name]",
      keyPoints: [
        "Emphasized 5+ years React experience matching job requirements",
        "Highlighted performance optimization achievements",
        "Mentioned specific user scale metrics",
        "Connected experience to company's stated goals"
      ]
    },
    improvements: [
      {
        type: "addition",
        section: "Resume Summary",
        suggestion: "Added performance optimization expertise",
        reason: "Job posting emphasizes building scalable applications"
      },
      {
        type: "emphasis",
        section: "Cover Letter",
        suggestion: "Highlighted 100k+ user experience",
        reason: "Demonstrates ability to work at TechCorp's scale"
      },
      {
        type: "modification",
        section: "Skills",
        suggestion: "Moved TypeScript to top 3 skills",
        reason: "Listed as key requirement in job posting"
      }
    ]
  }
};

export const mockProgress: UserProgress = {
  dailyGoal: 5,
  applicationsToday: 2,
  totalApplications: 47,
  completionRate: 40,
  lastUpdated: new Date().toISOString()
};