import { SlashCommand } from "./types.js";
import { AgentLoop } from "../agent-loop.js";

export const configCommand: SlashCommand = {
  name: "/config",
  description: "查看当前生效配置",
  usage: "/config",
  execute: async (args, agentLoop) => {
    console.log("\n⚙️ 【当前环境配置】");
    console.log("-----------------------------------------");
    console.log(`Provider   : ${process.env.QINGLING_LLM_PROVIDER || "未设置"}`);
    console.log(`Model      : ${process.env.QINGLING_LLM_MODEL || "未设置"}`);
    console.log(`Endpoint   : ${process.env.QINGLING_LLM_ENDPOINT || "默认"}`);
    console.log(`Workspace  : ${process.cwd()}`);
    console.log(`Vision     : ${process.env.QINGLING_FEATURES_VISION_TOOL === "true" ? "开启" : "关闭"}`);
    console.log(`Memory     : ${process.env.QINGLING_FEATURES_SEMANTIC_MEMORY === "true" ? "语义" : "传统"}`);
    console.log("-----------------------------------------\n");
  },
};
