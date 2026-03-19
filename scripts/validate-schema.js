#!/usr/bin/env node
/**
 * Validate JSON against OpenCode federal platform pack schemas.
 * Usage: node scripts/validate-schema.js <schema> <json-file>
 * Example: node scripts/validate-schema.js review-score output.json
 */

const fs = require("fs");
const path = require("path");

const SCHEMAS = {
  "review-score": "schemas/review-score.schema.json",
  "quality-gate": "schemas/quality-gate.schema.json",
};

async function main() {
  const schemaName = process.argv[2];
  const jsonPath = process.argv[3];

  if (!schemaName || !jsonPath) {
    console.error("Usage: node scripts/validate-schema.js <schema> <json-file>");
    console.error("Schemas:", Object.keys(SCHEMAS).join(", "));
    process.exit(1);
  }

  const schemaPath = SCHEMAS[schemaName];
  if (!schemaPath) {
    console.error("Unknown schema:", schemaName);
    process.exit(1);
  }

  const root = path.resolve(__dirname, "..");
  const schemaFullPath = path.join(root, schemaPath);

  if (!fs.existsSync(schemaFullPath)) {
    console.error("Schema not found:", schemaFullPath);
    process.exit(1);
  }

  if (!fs.existsSync(jsonPath)) {
    console.error("JSON file not found:", jsonPath);
    process.exit(1);
  }

  try {
    const Ajv = (await import("ajv")).default;
    const addFormats = (await import("ajv-formats")).default;
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);

    const schema = JSON.parse(fs.readFileSync(schemaFullPath, "utf8"));
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
      console.log("✓ Valid");
      process.exit(0);
    } else {
      console.error("✗ Invalid:");
      for (const err of validate.errors) {
        console.error(`  ${err.instancePath || "/"}: ${err.message}`);
      }
      process.exit(1);
    }
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND" && e.message.includes("ajv")) {
      console.error("Run: npm install ajv ajv-formats");
      process.exit(1);
    }
    throw e;
  }
}

main();
