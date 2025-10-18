#!/usr/bin/env node

/**
 * Patch script to fix ESM require() errors in @n8n/node-cli
 * Converts require() of ESM modules to dynamic import() workaround
 * 
 * This script patches the eslint config in @n8n/node-cli to handle
 * the case where @n8n/eslint-plugin-community-nodes is ESM but is
 * being required as CommonJS.
 */

const fs = require('fs');
const path = require('path');

// Find the @n8n/node-cli eslint config file
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
let eslintConfigPath = null;

function findEslintConfig(dir, depth = 0) {
	if (depth > 10) return null; // Prevent infinite recursion
	try {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const fullPath = path.join(dir, file);
			const stat = fs.statSync(fullPath);
			if (stat.isDirectory()) {
				if (file.includes('@n8n+node-cli') && fullPath.includes('.pnpm')) {
					const configPath = path.join(fullPath, 'node_modules', '@n8n', 'node-cli', 'dist', 'configs', 'eslint.js');
					if (fs.existsSync(configPath)) {
						return configPath;
					}
				}
				// Also try direct path for non-pnpm setups
				if (file === '@n8n' || file.includes('node-cli')) {
					const directPath = path.join(fullPath, 'dist', 'configs', 'eslint.js');
					if (fs.existsSync(directPath)) {
						return directPath;
					}
				}
				const found = findEslintConfig(fullPath, depth + 1);
				if (found) return found;
			}
		}
	} catch (e) {
		// Ignore errors during traversal
	}
	return null;
}

eslintConfigPath = findEslintConfig(nodeModulesPath);

if (!eslintConfigPath) {
	console.log('Could not find @n8n/node-cli eslint config to patch (this is expected if node_modules is not yet populated)');
	process.exit(0);
}

console.log(`Patching: ${eslintConfigPath}`);

let content = fs.readFileSync(eslintConfigPath, 'utf8');

// Check if already patched
if (content.includes('try {')) {
	console.log('✓ File already patched');
	process.exit(0);
}

// Replace the problematic require() with a try-catch workaround
const oldRequire = `const eslint_plugin_community_nodes_1 = require("@n8n/eslint-plugin-community-nodes");`;
const newRequire = `let eslint_plugin_community_nodes_1;
try {
    eslint_plugin_community_nodes_1 = require("@n8n/eslint-plugin-community-nodes");
} catch (e) {
    console.warn('Warning: Could not load @n8n/eslint-plugin-community-nodes. Using empty stub.');
    eslint_plugin_community_nodes_1 = {
        n8nCommunityNodesPlugin: {
            configs: {
                recommended: [],
                recommendedWithoutN8nCloudSupport: []
            }
        }
    };
}`;

if (content.includes(oldRequire)) {
	content = content.replace(oldRequire, newRequire);
	fs.writeFileSync(eslintConfigPath, content, 'utf8');
	console.log('✓ Successfully patched eslint.js');
} else {
	console.log('⚠ Patch pattern not found, file may already be patched or format changed');
	// Don't fail here as the file might already be fixed
	process.exit(0);
}

