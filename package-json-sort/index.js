import path from 'node:path'
import fs from 'node:fs/promises'
import sortKeys from 'sort-keys'
import detectIndent from 'detect-indent'

// https://docs.npmjs.com/cli/v7/configuring-npm/package-json
export const keysOrder = [
	'$schema',
	// standards
	'name',
	'version',
	'description',
	'private',
	'license',
	'repository',
	'homepage',
	'author',
	'bin',
	'type',
	'main',
	'browser',
	'exports',
	'engines',
	'scripts',
	'files',
	'keywords',
	// deps
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'bundledDependencies',
	'optionalDependencies',
	// ts
	'types',
	// libs
	'ava',
	'nyc',
	'xo',
]

export default async function packageJsonSort(options = {}) {
	const {cwd, compare} = {
		cwd: process.cwd(),
		compare: (left, right) => {
			return keysOrder.indexOf(left) - keysOrder.indexOf(right)
		},
		...options,
	}
	const content = await fs.readFile(
		path.resolve(cwd, 'package.json'),
		'utf-8',
	)
	const indent = detectIndent(content).indent
	const json = sortKeys(JSON.parse(content), {
		compare,
	})
	await fs.writeFile(
		'package.json',
		JSON.stringify(json, null, indent) + '\n',
	)
}
