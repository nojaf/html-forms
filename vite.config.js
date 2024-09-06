import { spawn, execSync } from "child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function rescriptPlugin() {
  let rescriptProcressRef = null;
  let logger = { info: console.log, warn: console.warn, error: console.error };
  let command = "build";

  return {
    name: "rescript",
    enforce: "pre",
    // Don't watch *.res file with ReScript.
    config: function (config) {
      if (!config.server) {
        config.server = {};
      }

      if (!config.server.watch) {
        config.server.watch = {};
      }

      if (Array.isArray(config.server.watch.ignored)) {
        config.server.watch.ignored.push("**/*.res");
      } else {
        config.server.watch.ignored = ["**/*.res"];
      }
    },
    configResolved: async function (resolvedConfig) {
      logger = resolvedConfig.logger;
      command = resolvedConfig.command;
    },
    buildStart: async function () {
      if (command === "build") {
        logger.info(execSync("rewatch").toString().trim());
      } else {
        rescriptProcressRef = spawn("rewatch", ["watch"]);
        logger.info(`Spawned bunx rewatch watch`);

        // Process standard output
        rescriptProcressRef.stdout.on("data", (data) => {
          logger.info(data.toString().trim());
        });

        // Process standard error
        rescriptProcressRef.stderr.on("data", (data) => {
          logger.error(data.toString().trim());
        });

        // Handle process exit
        rescriptProcressRef.on("close", (code) => {
          console.log(`ReScript process exited with code ${code || 0}`);
        });
      }
    },
    buildEnd: async function () {
      if (rescriptProcressRef && !rescriptProcressRef.killed) {
        const pid = rescriptProcressRef.pid;
        rescriptProcressRef.kill("SIGKILL"); // Default signal is SIGTERM
        logger.info(`ReScript process with PID: ${pid} has been killed`);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ["**/*.res.mjs"],
    }),
    rescriptPlugin(),
  ],
  base: "/html-forms/",
});
