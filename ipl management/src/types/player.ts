export type Role = 'Batsman' | 'Bowler' | 'All Rounder' | 'WK';

export interface Player {
  id: string;
  name: string;
  role: Role;
  isCaptain: boolean;
  isViceCaptain: boolean;
  team: string;
}
