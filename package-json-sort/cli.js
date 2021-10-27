#!/usr/bin/env node
import packageJsonSort from './index.js'

let dirs = process.argv.slice(2)

if (dirs.length === 0) dirs = [process.cwd()]

for (const dir of dirs) {
	await packageJsonSort({cwd: dir})
	console.log(`File: ${dir}/package.json is sorted!`)
}
