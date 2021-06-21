import less from 'less'
import { readFileSync, writeFileSync } from 'fs'
import { exec } from 'child_process'
import { stderr, stdout } from 'process'
// import Parcel from '@parcel/core'
// {
//     console.log("Compiling LESS -> CSS")
//     let result = await less.render(
//         readFileSync("assets/main.less", { encoding: 'utf-8' }),
//         { "sourceMap": { "outputSourceFiles": true } }
//     )
//     writeFileSync("assets/main.css", result.css)
// }

// {
//     console.log("Compiling TypeScript -> JS")
//     // let bundler = new Parcel({
//     //     entries: "assets/scripts/main.ts"
//     // })
//     // await bundler.run()
//     let process = exec("yarn parcel build  assets/scripts/main.ts --dist-dir assets/scripts")
//     process.stdout.pipe(stdout)
//     process.stderr.pipe(stderr)

// }
