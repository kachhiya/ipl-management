// src/components/PlayerForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Player, Role } from "../types/player";
import styles from "./PlayerForm.module.css"; // Import the CSS module

const roles: Role[] = ["Batsman", "Bowler", "All Rounder", "WK"];

type PlayerFormProps = {
  onSubmit: (player: Player) => void;
  initialData?: Player;
  teams: string[];
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum([roles[0], ...roles.map(String)]),
  isCaptain: z.boolean(),
  isViceCaptain: z.boolean(),
  team: z.string(),
});

export default function PlayerForm({ onSubmit, initialData, teams }: PlayerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Player>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input {...register("name")} className={styles.input} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Role</label>
        <select {...register("role")} className={styles.input}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <input type="checkbox" {...register("isCaptain")} />
          Is Captain
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <input type="checkbox" {...register("isViceCaptain")} />
          Is Vice-Captain
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Team</label>
        <select {...register("team")} className={styles.input}>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
}
