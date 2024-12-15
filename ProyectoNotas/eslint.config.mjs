import globals from 'globals';
import pluginJs from 'eslint/js';
import neostandard from 'neostandars';

const rules = {
    quotes: ['error', 'single', { allowTemplateLiterals: true }]
};

export default [
    {
        languageOptions: { globals: globals.node} }, 
        pluginJs.configs.recommended,
        ...neostandard({
            semi: true,
        }),
        { rules }
];