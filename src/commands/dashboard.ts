import { SlashCommand } from "./types.js";
import { AgentLoop } from "../agent-loop.js";

export const dashboardCommand: SlashCommand = {
  name: "/dashboard",
  description: "获取观测控制台链接",
  usage: "/dashboard",
  execute: async (args, agentLoop) => {
    const port = process.env.QINGLING_DASHBOARD_PORT || "9999";
    const enabled = process.env.QINGLING_FEATURES_DASHBOARD === "true";

    console.log("\n📊 【Observability Dashboard】");
    console.log("-----------------------------------------");
    if (enabled) {
      console.log(`本地链接 : http://localhost:${port}`);
      console.log("状态     : 运行中");
    } else {
      console.log("状态     : 未开启");
      console.log("提示     : 请设置环境变量 QINGLING_FEATURES_DASHBOARD=true 以启用。");
    }
    console.log("-----------------------------------------\n");
  },
};
