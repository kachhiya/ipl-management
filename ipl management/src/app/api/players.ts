import { NextApiRequest, NextApiResponse } from "next";
import { Player } from "../../types/player";
import { v4 as uuidv4 } from "uuid";

let players: Player[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(players);
  } else if (req.method === "POST") {
    const player: Player = { ...req.body, id: uuidv4() };
    if (
      player.isCaptain &&
      players.find((p) => p.isCaptain && p.team === player.team)
    ) {
      return res.status(400).json({ message: "Team already has a captain" });
    }
    if (
      player.isViceCaptain &&
      players.find((p) => p.isViceCaptain && p.team === player.team)
    ) {
      return res
        .status(400)
        .json({ message: "Team already has a vice-captain" });
    }
    players.push(player);
    res.status(201).json(player);
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const playerIndex = players.findIndex((p) => p.id === id);
    if (playerIndex === -1)
      return res.status(404).json({ message: "Player not found" });
    players[playerIndex] = { ...players[playerIndex], ...req.body };
    res.status(200).json(players[playerIndex]);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    players = players.filter((p) => p.id !== id);
    res.status(200).json({ message: "Player deleted" });
  }
}
