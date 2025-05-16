
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Player } from "@/lib/team-utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface PlayerFormProps {
  onAddPlayer: (player: Player) => void;
  playerCount: number;
  maxPlayers: number;
}

const PlayerForm = ({ onAddPlayer, playerCount, maxPlayers }: PlayerFormProps) => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState([5]);
  
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter a player name");
      return;
    }
    
    if (playerCount >= maxPlayers) {
      toast.error(`Maximum ${maxPlayers} players allowed`);
      return;
    }
    
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: name.trim(),
      skill: skill[0],
    };
    
    onAddPlayer(newPlayer);
    setName("");
    setSkill([5]);
    
    if (playerCount + 1 === maxPlayers) {
      toast.success("All players added! Click 'Create Teams' to continue.");
    }
  };
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-gaming">
          {playerCount >= maxPlayers 
            ? "Maximum Players Reached" 
            : `Add Player ${playerCount + 1} of ${maxPlayers}`}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleAddPlayer}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Player Name</Label>
            <Input
              id="name"
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={playerCount >= maxPlayers}
              className="border-accent/50 bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skill" className="flex justify-between">
              <span>Skill Level</span>
              <span className="text-primary font-bold">{skill[0]}/10</span>
            </Label>
            <Slider
              id="skill"
              min={1}
              max={10}
              step={1}
              value={skill}
              onValueChange={setSkill}
              disabled={playerCount >= maxPlayers}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Pro</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={playerCount >= maxPlayers} 
            className="w-full bg-primary hover:bg-primary/80"
          >
            {playerCount >= maxPlayers ? "Team Full" : "Add Player"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PlayerForm;
