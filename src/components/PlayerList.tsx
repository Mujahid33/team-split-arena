
import { Player } from "@/lib/team-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
}

const PlayerList = ({ players, onRemovePlayer }: PlayerListProps) => {
  if (players.length === 0) {
    return null;
  }
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-gaming">Player Roster</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {players.map((player) => (
          <div 
            key={player.id} 
            className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{player.name}</span>
              <Badge variant="outline" className="bg-primary/20">
                Skill: {player.skill}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemovePlayer(player.id)}
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
            >
              Remove
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlayerList;
