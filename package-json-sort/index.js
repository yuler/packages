import fs from 'node:fs/promises'

import sortKeys from 'sort-keys'
import detectIndent from 'detect-indent'

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

export default async function packageJsonSort() {
	const content = await fs.readFile('package.json', 'utf-8')
	const indent = detectIndent(content).indent
	const json = sortKeys(JSON.parse(content), {
		compare: (left, right) => {
			return orderList.indexOf(left) - orderList.indexOf(right)
		},
	})
	await fs.writeFile(
		'package.json',
		JSON.stringify(json, null, indent) + '\n',
	)
}

packageJsonSort()
