#!/usr/bin/env node
/**
 * Validate JSON against OpenCode federal platform pack schemas.
 * Usage: node scripts/validate-schema.js <schema> <json-file>
 * Example: node scripts/validate-schema.js review-score output.json
 * Programmatic: const { validateFileSync } = require("./validate-schema.js");
 */

const fs = require("fs");
const path = require("path");

const SCHEMAS = {
  "review-score": "schemas/review-score.schema.json",
  "quality-gate": "schemas/quality-gate.schema.json",
  "compliance-report": "schemas/compliance-report.json",
};

let _validators;
function getValidator(schemaName) {
  if (!_validators) {
    const root = path.resolve(__dirname, "..");
    const Ajv = require("ajv").default || require("ajv");
    const addFormats = require("ajv-formats").default || require("ajv-formats");
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    _validators = {};
    for (const [name, schemaPath] of Object.entries(SCHEMAS)) {
      const fullPath = path.join(root, schemaPath);
      if (fs.existsSync(fullPath)) {
        const schema = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        _validators[name] = ajv.compile(schema);
      }
    }
  }
  const validate = _validators[schemaName];
  if (!validate) throw new Error("Unknown schema: " + schemaName);
  return validate;
}

function validateFileSync(schemaName, jsonPath) {
  if (!fs.existsSync(jsonPath)) throw new Error("JSON file not found: " + jsonPath);
  const validate = getValidator(schemaName);
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const valid = validate(data);
  return { valid, errors: valid ? [] : (validate.errors || []).map((e) => `${e.instancePath || "/"}: ${e.message}`) };
}

function main() {
  const schemaName = process.argv[2];
  const jsonPath = process.argv[3];
  if (!schemaName || !jsonPath) {
    console.error("Usage: node scripts/validate-schema.js <schema> <json-file>");
    console.error("Schemas:", Object.keys(SCHEMAS).join(", "));
    process.exit(1);
  }
  try {
    const { valid, errors } = validateFileSync(schemaName, jsonPath);
    if (valid) {
      console.log("✓ Valid");
      process.exit(0);
    } else {
      console.error("✗ Invalid:");
      for (const err of errors) console.error("  " + err);
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

if (require.main === module) main();
module.exports = { validateFileSync };
