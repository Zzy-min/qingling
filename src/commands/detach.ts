import { SlashCommand } from "./types.js";
import { AgentLoop } from "../agent-loop.js";

export const detachCommand: SlashCommand = {
  name: "/detach",
  description: "将当前任务脱离终端在后台运行",
  usage: "/detach",
  execute: async (args, agentLoop) => {
    console.log("\n🚀 【使命脱离】");
    console.log("-----------------------------------------");
    console.log("提示: 这是一个 M2 阶段的功能预演。");
    console.log("在 M3 阶段中，此指令将把当前工作流迁移至 qinglingd 守护进程。");
    console.log("目前请保持终端开启以确保任务完成。");
    console.log("-----------------------------------------\n");
  },
};
