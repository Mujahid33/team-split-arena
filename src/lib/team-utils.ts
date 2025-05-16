
export interface Player {
  id: string;
  name: string;
  skill: number;
}

export interface Team {
  name: string;
  players: Player[];
  totalSkill: number;
}

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Create balanced teams by distributing players based on skill
export function createBalancedTeams(players: Player[]): [Team, Team] {
  if (players.length < 2) {
    return [
      { name: "Team 1", players: [], totalSkill: 0 },
      { name: "Team 2", players: [], totalSkill: 0 }
    ];
  }

  // Sort players by skill (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);
  
  const team1: Player[] = [];
  const team2: Player[] = [];
  let team1Skill = 0;
  let team2Skill = 0;
  
  // Distribute players snake draft style (1-2-2-1...)
  sortedPlayers.forEach((player, index) => {
    // For even indices (0, 2, 4, ...) add to team with lower total skill
    // For odd indices (1, 3, 5, ...) add to team with lower total skill
    if (team1Skill <= team2Skill) {
      team1.push(player);
      team1Skill += player.skill;
    } else {
      team2.push(player);
      team2Skill += player.skill;
    }
  });
  
  return [
    { name: "Team 1", players: team1, totalSkill: team1Skill },
    { name: "Team 2", players: team2, totalSkill: team2Skill }
  ];
}

// Create random teams without skill consideration
export function createRandomTeams(players: Player[]): [Team, Team] {
  const shuffled = shuffleArray(players);
  const midpoint = Math.ceil(shuffled.length / 2);
  
  const team1Players = shuffled.slice(0, midpoint);
  const team2Players = shuffled.slice(midpoint);
  
  const team1Skill = team1Players.reduce((sum, player) => sum + player.skill, 0);
  const team2Skill = team2Players.reduce((sum, player) => sum + player.skill, 0);
  
  return [
    { name: "Team 1", players: team1Players, totalSkill: team1Skill },
    { name: "Team 2", players: team2Players, totalSkill: team2Skill }
  ];
}
