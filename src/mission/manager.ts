// ============================================================
// 轻灵 - Mission Manager (v0.5)
// 负责 Mission 的持久化、状态流转与队列管理
// ============================================================

import * as fs from "fs/promises";
import * as path from "path";
import { existsSync } from "fs";
import { Mission, MissionStatus, MissionEvent } from "./types.js";

export class MissionManager {
  private stateDir: string;
  private missions: Map<string, Mission> = new Map();

  constructor(stateDir: string) {
    this.stateDir = path.join(stateDir, "missions");
  }

  async init(): Promise<void> {
    if (!existsSync(this.stateDir)) {
      await fs.mkdir(this.stateDir, { recursive: true });
    }
    await this.loadMissions();
  }

  async createMission(name: string, description: string, sessionId: string): Promise<Mission> {
    const mission: Mission = {
      id: `msn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      description,
      status: "queued",
      sessionId,
      lastContext: [],
      metrics: {
        startTime: Date.now(),
        totalTurns: 0,
        totalTokens: 0,
        totalToolCalls: 0,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.missions.set(mission.id, mission);
    await this.saveMission(mission);
    return mission;
  }

  async updateStatus(id: string, status: MissionStatus, error?: Mission["error"]): Promise<void> {
    const mission = this.missions.get(id);
    if (!mission) return;

    mission.status = status;
    if (error) mission.error = error;
    mission.updatedAt = Date.now();
    
    if (status === "succeeded" || status === "failed" || status === "canceled") {
      mission.metrics.endTime = Date.now();
    }

    await this.saveMission(mission);
  }

  getMission(id: string): Mission | undefined {
    return this.missions.get(id);
  }

  listMissions(): Mission[] {
    return Array.from(this.missions.values())
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  private async saveMission(mission: Mission): Promise<void> {
    const filePath = path.join(this.stateDir, `${mission.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(mission, null, 2), "utf-8");
  }

  private async loadMissions(): Promise<void> {
    const files = await fs.readdir(this.stateDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const raw = await fs.readFile(path.join(this.stateDir, file), "utf-8");
          const mission = JSON.parse(raw) as Mission;
          this.missions.set(mission.id, mission);
        } catch (err) {
          console.error(`[MissionManager] Failed to load mission ${file}: ${(err as Error).message}`);
        }
      }
    }
  }
}
