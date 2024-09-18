import { Player } from "../types/player";

interface PlayerFilterProps {
  players: Player[];
  filter: {
    role?: string;
    team?: string;
    isCaptain?: boolean;
    isViceCaptain?: boolean;
  };
  onFilterChange: (filter: any) => void;
}

const PlayerFilter = ({ players, filter, onFilterChange }: PlayerFilterProps) => {
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    onFilterChange({
      ...filter,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const filteredPlayers = players.filter((player) => {
    const matchRole = filter.role ? player.role === filter.role : true;
    const matchTeam = filter.team ? player.team === filter.team : true;
    const matchCaptain = filter.isCaptain ? player.isCaptain : true;
    const matchViceCaptain = filter.isViceCaptain ? player.isViceCaptain : true;
    return matchRole && matchTeam && matchCaptain && matchViceCaptain;
  });

  return (
    <div>
      <label>Role</label>
      <input name="role" onChange={handleChange} />

      <label>Team</label>
      <input name="team" onChange={handleChange} />

      <label>Captain</label>
      <input type="checkbox" name="isCaptain" onChange={handleChange} />

      <label>Vice-Captain</label>
      <input type="checkbox" name="isViceCaptain" onChange={handleChange} />

      <ul>
        {filteredPlayers.map((player) => (
          <li key={player.id}>
            {player.name} - {player.role} ({player.team})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerFilter;
