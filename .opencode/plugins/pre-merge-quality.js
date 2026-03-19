/**
 * Pre-merge quality checks for federal platform pack.
 * Runs quality checks before recommending push/merge readiness.
 * Hooks into tool execution to surface findings.
 */

export const PreMergeQualityPlugin = async ({ project, client, $, directory, worktree }) => {
  const checks = {
    hasReadme: false,
    hasGitignore: false,
    noPlaintextSecrets: true,
    hasDependencyLock: false,
    hasCiConfig: false,
  };

  return {
    "tool.execute.after": async (input, output) => {
      if (input.tool !== "write" && input.tool !== "edit") return;

      try {
        const files = await $`find ${directory} -maxdepth 2 -name "README*" -o -name ".gitignore" -o -name "package-lock.json" -o -name "yarn.lock" -o -name "go.sum" -o -name "requirements.txt" -o -path "*/.github/*" -o -path "*/.gitlab/*" 2>/dev/null | head -20`.text();
        checks.hasReadme = files.includes("README") || files.includes("README.md");
        checks.hasGitignore = files.includes(".gitignore");
        checks.hasDependencyLock = /(package-lock|yarn\.lock|go\.sum|requirements\.lock)/.test(files);
        checks.hasCiConfig = /\.github|\.gitlab/.test(files);
      } catch (_) {
        // Non-fatal; checks are best-effort
      }
    },

    "session.idle": async () => {
      const warnings = [];
      if (!checks.hasReadme) warnings.push("README missing or not found");
      if (!checks.hasGitignore) warnings.push(".gitignore missing");
      if (!checks.hasDependencyLock) warnings.push("Consider adding dependency lock file (package-lock.json, go.sum, etc.)");
      if (!checks.hasCiConfig) warnings.push("No CI config found (.github, .gitlab)");

      if (warnings.length > 0) {
        await client.app.log({
          body: {
            service: "pre-merge-quality",
            level: "info",
            message: "Pre-merge quality checks",
            extra: { warnings },
          },
        });
      }
    },
  };
};
