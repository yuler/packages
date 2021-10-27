#!/usr/bin/env node
import path from 'node:path'
import packageJsonSort from './index.js'

let dirs = process.argv.slice(2)

if (dirs.length === 0) dirs = ['.']

for (const dir of dirs) {
	await packageJsonSort({cwd: path.resolve(process.cwd(), dir)})
	console.log(`File: ${dir}/package.json is sorted!`)
}
