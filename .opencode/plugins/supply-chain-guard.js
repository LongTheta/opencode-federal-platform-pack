/**
 * Supply-chain guard for build and deployment changes.
 * Flags floating tags, unpinned dependencies, and missing attestation.
 */

export const SupplyChainGuardPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "write" && input.tool !== "edit") return;

      // Best-effort: if we're editing Dockerfile, package.json, go.mod, etc.,
      // the agent should be reminded of supply-chain principles.
      // This plugin logs; it does not block.
      const editPaths = output?.args?.filePath || output?.args?.path || "";
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

      const isSupplyChainRelevant = supplyChainFiles.some((f) =>
        String(editPaths).includes(f)
      );

      if (isSupplyChainRelevant) {
        await client.app.log({
          body: {
            service: "supply-chain-guard",
            level: "info",
            message: "Supply-chain relevant file edited. Reminder: pin dependencies, avoid :latest, consider SBOM/provenance.",
            extra: { path: editPaths },
          },
        });
      }
    },
  };
};
