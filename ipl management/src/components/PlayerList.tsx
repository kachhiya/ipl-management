// src/components/PlayerList.tsx
"use client";

import { Player } from "../types/player";
import styles from "./PlayerList.module.css"; // Import the CSS module

type PlayerListProps = {
  players: Player[];
  onEdit: (player: Player) => void;
};

export default function PlayerList({ players, onEdit }: PlayerListProps) {
  return (
    <div className={styles.listContainer}>
      {players.map((player) => (
        <div key={player.id} className={styles.playerItem}>
          <span className={styles.playerName}>{player.name}</span>
          <button onClick={() => onEdit(player)} className={styles.editButton}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
