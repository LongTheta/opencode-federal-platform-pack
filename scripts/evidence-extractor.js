#!/usr/bin/env node
/**
 * Evidence extractor — extract file paths, configs, manifests from repo for evidence-based review.
 * Usage: node scripts/evidence-extractor.js [directory]
 * Output: JSON to stdout (artifacts, configs, manifests, ci_cd)
 * See: .opencode/tools/evidence-extractor.md
 */

const fs = require("fs");
const path = require("path");

const EXCLUDE = ["node_modules", ".git", "dist", "build", ".next", "coverage", "__pycache__", "vendor"];

const RE_TF = /\.(tf|tf\.json)$/;
const RE_YAML = /\.(yaml|yml)$/;

function getType(filePath) {
  const lower = filePath.toLowerCase();
  if (lower.includes("dockerfile") || lower.includes("docker-compose")) return "container";
  if (RE_TF.test(lower)) return "iac";
  if (RE_YAML.test(lower) && (lower.includes("deployment") || lower.includes("service") || lower.includes("kustomization") || lower.includes("chart")))
    return "manifest";
  if (lower.includes(".github/") || lower.includes("gitlab-ci") || lower.includes("jenkinsfile"))
    return "ci_cd";
  if (lower.includes("package.json") || lower.includes("go.mod")) return "config";
  return "config";
}

function walkDir(dir, baseDir, result, depth = 0) {
  if (depth > 10) return;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }
  for (const ent of entries) {
    const fullPath = path.join(dir, ent.name);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
    if (EXCLUDE.some((ex) => relPath.startsWith(ex) || relPath.includes("/" + ex + "/"))) continue;
    if (ent.isDirectory()) {
      walkDir(fullPath, baseDir, result, depth + 1);
    } else {
      const type = getType(relPath);
      let excerpt = "";
      let size = 0;
      try {
        const stat = fs.statSync(fullPath);
        size = stat.size || 0;
        const fd = fs.openSync(fullPath, "r");
        const buf = Buffer.alloc(256);
        const bytes = fs.readSync(fd, buf, 0, 200, 0);
        fs.closeSync(fd);
        excerpt = buf.toString("utf8", 0, bytes).replace(/\n/g, " ").trim();
      } catch {
        // Ignore read errors (permissions, binary, etc.)
      }
      result.artifacts.push({ path: relPath, type, size, excerpt });
      if (type === "config" || type === "iac" || type === "container") result.configs.push(relPath);
      if (type === "manifest") result.manifests.push(relPath);
      if (type === "ci_cd") result.ci_cd.push(relPath);
    }
  }
}

function main() {
  const dir = process.argv[2] || process.cwd();
  const absDir = path.resolve(dir);
  if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) {
    console.error("Directory not found:", absDir);
    process.exit(1);
  }
  const result = {
    artifacts: [],
    configs: [],
    manifests: [],
    ci_cd: [],
    structure: { root: absDir },
  };
  walkDir(absDir, absDir, result);
  console.log(JSON.stringify(result, null, 2));
}

main();
