import less from 'less'
import { readFileSync, writeFileSync } from 'fs'

let result = await less.render(readFileSync("assets/main.less", { encoding: 'utf-8' }))
writeFileSync("assets/main.css", result.css)
