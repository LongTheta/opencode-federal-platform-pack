/**
 * Pre-merge quality checks for federal platform pack.
 * Runs quality checks before recommending push/merge readiness.
 * Hooks into tool execution to surface findings.
 */

import fs from "fs";
import path from "path";

function listPaths(dir, maxDepth = 2, depth = 0, baseDir) {
  const root = baseDir || dir;
  if (depth > maxDepth) return [];
  let out = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = path.relative(root, full).replace(/\\/g, "/");
      out.push(rel);
      if (e.isDirectory() && depth < maxDepth) {
        out = out.concat(listPaths(full, maxDepth, depth + 1, root));
      }
    }
  } catch (_) {
    // Ignore permission errors
  }
  return out;
}

export const PreMergeQualityPlugin = async ({ project: _project, client, directory, worktree: _worktree }) => {
  const checks = {
    hasReadme: false,
    hasGitignore: false,
    noPlaintextSecrets: true,
    hasDependencyLock: false,
    hasCiConfig: false,
  };

  return {
    "tool.execute.after": async (input, _output) => {
      if (input.tool !== "write" && input.tool !== "edit") return;

      try {
        const paths = listPaths(directory);
        const pathStr = paths.join("\n");
        checks.hasReadme = paths.some((p) => /README/i.test(p));
        checks.hasGitignore = paths.some((p) => p.endsWith(".gitignore"));
        checks.hasDependencyLock = /(package-lock\.json|yarn\.lock|go\.sum|requirements\.lock)/.test(pathStr);
        checks.hasCiConfig = paths.some((p) => p.includes(".github") || p.includes(".gitlab"));
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
