import './build.mjs'
import archiver from 'archiver'
import fs from 'fs'

let out = fs.createWriteStream("dist.zip")
let archive = archiver('zip', { zlib: { level: 9 } })

archive.pipe(out)
archive.on("entry", (entry) => {
    console.log("Added: ", entry.name)
})
archive.on("error", (data) => {
    console.log(`Error: ${data.message}`)
})

// include assets, but not main.less
archive.directory('assets/dist')

// include partials
archive.directory('partials')

// include basic files
archive.glob("*.hbs")
archive.file("package.json")

archive.finalize()
