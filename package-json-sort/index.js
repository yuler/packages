import fs from 'node:fs/promises'

import sortKeys from 'sort-keys'

// refs: https://docs.npmjs.com/cli/v7/configuring-npm/package-json
const orderList = [
	'$schema',
	'name',
	'version',
	'description',
	'license',
	'repository',
	'homepage',
	'author',
	'bin',
	'type',
	'exports',
	'engines',
	'scripts',
	'files',
	'keywords',
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'types',
	'ava',
	'nyc',
	'xo',
]

export default async function packageJsonSort(json, order) {
	let packageJson = JSON.parse(await fs.readFile('package.json'))
	packageJson = sortKeys(packageJson, {
		compare: (left, right) => {
			return orderList.indexOf(left) - orderList.indexOf(right)
		},
	})
	console.table(packageJson)
}

packageJsonSort()
