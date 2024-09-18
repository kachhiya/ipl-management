"use client"; 

import { useEffect, useState } from "react";
import PlayerForm from "../components/PlayerForm";
import PlayerList from "../components/PlayerList";
import PlayerFilter from "../components/PlayerFilter";
import { Player } from "../types/player";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    // Fetch players on mount
    fetch("/api/players")
      .then((res) => res.json())
      .then(setPlayers);
  }, []);

  const handleSubmit = (player: Player) => {
    if (selectedPlayer) {
      // Update player
      fetch(`/api/players?id=${selectedPlayer.id}`, {
        method: "PUT",
        body: JSON.stringify(player),
        headers: { "Content-Type": "application/json" }
      }).then(() => {
        setSelectedPlayer(null);
        fetchPlayers();
      });
    } else {
      // Add new player
      fetch("/api/players", {
        method: "POST",
        body: JSON.stringify(player),
        headers: { "Content-Type": "application/json" }
      }).then(() => fetchPlayers());
    }
  };

  const fetchPlayers = () => {
    fetch("/api/players")
      .then((res) => res.json())
      .then(setPlayers);
  };

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <div>
      <h1>Player Management</h1>
      <PlayerForm onSubmit={handleSubmit} initialData={selectedPlayer || undefined} teams={["Team A", "Team B"]} />
      <PlayerFilter players={players} filter={filter} onFilterChange={setFilter} />
      <PlayerList players={players} onEdit={handleEdit} />
    </div>
  );
}
