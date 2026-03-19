/**
 * Federal platform enforcement plugin.
 * Blocks unsafe actions, flags secrets, requires evidence, logs for audit.
 * Combines .env protection, secrets detection, supply-chain reminders, quality-gate enforcement.
 */

const SECRET_PATTERNS = [
  /\b(api[_-]?key|apikey|secret|password|passwd|token|credential)\s*[:=]\s*['"]?[a-zA-Z0-9_-]{20,}/i,
  /\b(aws_access_key|aws_secret|AZURE_|GCP_|GOOGLE_)\w*\s*[:=]/i,
  /Bearer\s+[a-zA-Z0-9_.-]+/i,
];

const DANGEROUS_BASH = [
  /rm\s+-rf\s+\/\s*$/,
  /rm\s+-rf\s+\/\s*#/,
  /:(){\s*:\|:&\s*};:/,
  /mkfs\.\w+\s+\//,
  /dd\s+if=.*of=\/dev\/sd/,
];

function looksLikeSecret(text) {
  if (!text || typeof text !== "string") return false;
  return SECRET_PATTERNS.some((p) => p.test(text));
}

function isDangerousBash(cmd) {
  if (!cmd || typeof cmd !== "string") return false;
  return DANGEROUS_BASH.some((p) => p.test(cmd));
}

export const FederalPlatformEnforcement = async ({
  project: _project,
  client,
  $: _$,
  directory: _directory,
  worktree: _worktree,
}) => {
  let qualityGateReminderShown = false;

  return {
    "tool.execute.before": async (input, output) => {
      const tool = input?.tool || input?.name;

      // Block reading .env files
      if (tool === "read" || tool === "read_file") {
        const path =
          output?.args?.path ||
          output?.args?.filePath ||
          input?.args?.path ||
          input?.args?.filePath ||
          "";
        if (String(path).includes(".env")) {
          throw new Error(
            "[Federal Platform Pack] Do not read .env files. Use environment variable references or a secrets manager."
          );
        }
      }

      // Block dangerous bash commands
      if (tool === "bash" || tool === "Bash" || tool === "run_terminal_cmd") {
        const cmd =
          output?.args?.command ||
          output?.args?.command_line ||
          JSON.stringify(output?.args || {});
        if (isDangerousBash(cmd)) {
          throw new Error(
            "[Federal Platform Pack] Dangerous command blocked. Refusing to execute."
          );
        }
      }

      // Block or warn on git push without quality-gate
      // Set FEDERAL_PLATFORM_BLOCK_PUSH=1 to block; otherwise warns only
      if (tool === "bash" || tool === "Bash" || tool === "run_terminal_cmd") {
        const cmd =
          output?.args?.command ||
          output?.args?.command_line ||
          JSON.stringify(output?.args || {});
        if (/git\s+push/.test(cmd) && !qualityGateReminderShown) {
          qualityGateReminderShown = true;
          const blockPush = process.env.FEDERAL_PLATFORM_BLOCK_PUSH === "1" || process.env.FEDERAL_PLATFORM_BLOCK_PUSH === "true";
          if (blockPush) {
            throw new Error(
              "[Federal Platform Pack] Run /quality-gate before push. Set FEDERAL_PLATFORM_BLOCK_PUSH=0 to warn only."
            );
          }
          await client.app.log({
            body: {
              service: "federal-platform-enforcement",
              level: "warn",
              message:
                "Consider running /quality-gate before push. Evidence, security, docs, and supply-chain checks are required.",
              extra: { triggered: "git push" },
            },
          });
        }
      }

      // Flag potential secrets in write/edit
      if (tool === "write" || tool === "edit") {
        const content =
          output?.args?.contents ||
          output?.args?.text ||
          output?.args?.new_string ||
          "";
        if (looksLikeSecret(String(content))) {
          await client.app.log({
            body: {
              service: "federal-platform-enforcement",
              level: "warn",
              message:
                "Potential secret detected in write/edit. Use a secrets manager or environment variables.",
              extra: { tool },
            },
          });
        }
      }
    },

    "tool.execute.after": async (input, output) => {
      const tool = input?.tool || input?.name;

      // Supply-chain reminder on relevant file edits
      if (tool === "write" || tool === "edit") {
        const path =
          output?.args?.path ||
          output?.args?.filePath ||
          output?.args?.old_string ||
          "";
        const supplyChainFiles = [
          "Dockerfile",
          "package.json",
          "go.mod",
          "requirements.txt",
          "Pipfile",
          "Cargo.toml",
          ".github/",
          ".gitlab/",
        ];
        if (supplyChainFiles.some((f) => String(path).includes(f))) {
          await client.app.log({
            body: {
              service: "federal-platform-enforcement",
              level: "info",
              message:
                "Supply-chain file edited. Reminder: pin dependencies, avoid :latest, consider SBOM.",
              extra: { path },
            },
          });
        }
      }
    },

    "session.idle": async () => {
      qualityGateReminderShown = false;
    },
  };
};
