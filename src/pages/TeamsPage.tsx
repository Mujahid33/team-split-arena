
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Player, Team, createBalancedTeams, createRandomTeams } from "@/lib/team-utils";
import PlayerForm from "@/components/PlayerForm";
import PlayerList from "@/components/PlayerList";
import TeamDisplay from "@/components/TeamDisplay";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const MAX_PLAYERS = 10;

const TeamsPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<[Team, Team] | null>(null);
  const [balanceTeams, setBalanceTeams] = useState(true);
  const [showTeams, setShowTeams] = useState(false);

  const handleAddPlayer = (player: Player) => {
    setPlayers([...players, player]);
    // Reset teams when adding new players
    setShowTeams(false);
    setTeams(null);
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
    // Reset teams when removing players
    setShowTeams(false);
    setTeams(null);
  };

  const handleCreateTeams = () => {
    if (players.length < 2) {
      toast.error("Add at least 2 players to create teams");
      return;
    }
    
    const newTeams = balanceTeams 
      ? createBalancedTeams(players)
      : createRandomTeams(players);
      
    setTeams(newTeams);
    setShowTeams(true);
    toast.success("Teams created successfully!");
  };

  const handleResetTeams = () => {
    setPlayers([]);
    setTeams(null);
    setShowTeams(false);
    toast.info("Teams reset! Start adding players.");
  };

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-gaming bg-gradient-to-r from-team1-light via-primary to-team2-light bg-clip-text text-transparent">
          Team Generator
        </h1>
        <p className="text-muted-foreground">
          Add 10 players and split them into two balanced teams
        </p>
      </div>
      
      {!showTeams ? (
        <div className="grid md:grid-cols-2 gap-6">
          <PlayerForm 
            onAddPlayer={handleAddPlayer} 
            playerCount={players.length} 
            maxPlayers={MAX_PLAYERS}
          />
          <div className="space-y-6">
            <PlayerList 
              players={players} 
              onRemovePlayer={handleRemovePlayer} 
            />
            
            {players.length > 0 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6 pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="balance-teams" 
                        checked={balanceTeams} 
                        onCheckedChange={setBalanceTeams} 
                      />
                      <Label htmlFor="balance-teams">Balance teams by skill</Label>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {players.length}/{MAX_PLAYERS} Players
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={handleCreateTeams}
                      className="w-full bg-gaming-accent hover:bg-gaming-accent/80"
                    >
                      Create Teams
                    </Button>
                    
                    <Button 
                      onClick={handleResetTeams} 
                      variant="outline" 
                      className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <TeamDisplay team={teams?.[0] || {name: "Team 1", players: [], totalSkill: 0}} variant="team1" />
            <TeamDisplay team={teams?.[1] || {name: "Team 2", players: [], totalSkill: 0}} variant="team2" />
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => {
                handleCreateTeams();
                toast.info("Teams shuffled!");
              }}
              className="bg-gaming-accent hover:bg-gaming-accent/80"
            >
              Shuffle Teams
            </Button>
            
            <Button 
              onClick={() => setShowTeams(false)} 
              variant="outline"
            >
              Edit Players
            </Button>
            
            <Button 
              onClick={handleResetTeams}
              variant="outline" 
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
