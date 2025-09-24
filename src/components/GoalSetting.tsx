import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GoalSettingProps {
  currentGoal: number;
  onGoalUpdate: (newGoal: number) => void;
}

export const GoalSetting = ({ currentGoal, onGoalUpdate }: GoalSettingProps) => {
  const [newGoal, setNewGoal] = useState([currentGoal]);

  const handleSaveGoal = () => {
    onGoalUpdate(newGoal[0]);
    toast({
      title: "Daily Goal Updated",
      description: `Your new daily application goal is ${newGoal[0]} applications.`,
      variant: "default",
    });
  };

  const getGoalAdvice = (goal: number) => {
    if (goal <= 3) return "Conservative approach - quality over quantity";
    if (goal <= 6) return "Balanced approach - sustainable pace";
    if (goal <= 10) return "Aggressive approach - high volume";
    return "Very aggressive - ensure application quality";
  };

  const getGoalColor = (goal: number) => {
    if (goal <= 3) return "secondary";
    if (goal <= 6) return "success";
    if (goal <= 10) return "warning";
    return "destructive";
  };

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Daily Application Goal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="goal-slider" className="text-sm font-medium">
              Applications per day
            </Label>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold text-card-foreground">
                {newGoal[0]}
              </span>
            </div>
          </div>
          
          <Slider
            id="goal-slider"
            min={1}
            max={15}
            step={1}
            value={newGoal}
            onValueChange={setNewGoal}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>8</span>
            <span>15</span>
          </div>
        </div>

        <div className="space-y-3">
          <Badge 
            variant={getGoalColor(newGoal[0])} 
            className="w-full justify-center py-2"
          >
            {getGoalAdvice(newGoal[0])}
          </Badge>
          
          <div className="text-sm text-muted-foreground text-center">
            <p>
              At {newGoal[0]} applications per day, you'll submit{" "}
              <span className="font-medium text-card-foreground">
                {newGoal[0] * 7} applications per week
              </span>
            </p>
          </div>
        </div>

        {newGoal[0] !== currentGoal && (
          <Button 
            onClick={handleSaveGoal}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Update Goal
          </Button>
        )}
      </CardContent>
    </Card>
  );
};