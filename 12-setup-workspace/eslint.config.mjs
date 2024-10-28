import globals from "globals";
import pluginJs from "@eslint/js";


const rules = {
  "no-magic-numbers": "warn",
  "no-unused-vars": "off",
};

export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.all,
  {rules},neostandard()
];