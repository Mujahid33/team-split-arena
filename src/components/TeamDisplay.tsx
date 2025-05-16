
import { Team } from "@/lib/team-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TeamDisplayProps {
  team: Team;
  variant: "team1" | "team2";
}

const TeamDisplay = ({ team, variant }: TeamDisplayProps) => {
  const isTeam1 = variant === "team1";
  
  const containerClasses = isTeam1 
    ? "border-team1 bg-team1/10" 
    : "border-team2 bg-team2/10";
    
  const headerClasses = isTeam1
    ? "bg-team1 text-primary-foreground"
    : "bg-team2 text-team2-dark";
    
  return (
    <Card className={cn("w-full border-2 animate-bounce-in overflow-hidden", containerClasses)}>
      <CardHeader className={cn("pb-2", headerClasses)}>
        <CardTitle className="text-xl font-gaming flex justify-between items-center">
          <span>{team.name}</span>
          <Badge className={cn(
            "font-normal text-xs",
            isTeam1 ? "bg-team1-dark text-primary-foreground" : "bg-team2-dark text-primary-foreground"
          )}>
            Total Skill: {team.totalSkill}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-2">
        {team.players.map((player) => (
          <div 
            key={player.id}
            className={cn(
              "p-2 rounded-md flex justify-between items-center",
              isTeam1 ? "bg-team1/20 hover:bg-team1/30" : "bg-team2/20 hover:bg-team2/30",
              "transition-colors"
            )}
          >
            <span className="font-medium">{player.name}</span>
            <Badge variant="outline" className={cn(
              "font-normal",
              isTeam1 ? "border-team1-light bg-team1/10" : "border-team2-light bg-team2/10"
            )}>
              Skill: {player.skill}
            </Badge>
          </div>
        ))}

        {team.players.length === 0 && (
          <div className="text-center text-muted-foreground italic py-4">
            No players assigned yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamDisplay;
