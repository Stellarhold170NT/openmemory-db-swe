// Ghép các phần .partNNofNN thành file gốc
// Usage: node join-file.mjs <output> <part-01-path>
import { createReadStream, createWriteStream, existsSync, readdirSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { createHash } from "node:crypto"

const out = process.argv[2]
const first = process.argv[3]
if (!out || !first || !existsSync(first)) { console.error("Usage: node join-file.mjs <output> <part-01>"); process.exit(1) }

const dir = dirname(first)
const base = first.replace(/\.part\d+of\d+$/, "")
const parts = readdirSync(dir).filter((f) => f.startsWith(`${base}.part`)).sort()
if (!parts.length) { console.error("không tìm thấy phần nào"); process.exit(1) }

const hash = createHash("sha256")
const writer = createWriteStream(out)
for (const part of parts) {
  await new Promise((res, rej) => {
    const r = createReadStream(join(dir, part))
    r.on("data", (c) => hash.update(c))
    r.pipe(writer, { end: false })
    r.on("end", res); r.on("error", rej)
  })
}
writer.end()
await new Promise((res) => writer.on("close", res))
console.log(`joined ${parts.length} parts -> ${out} (${(statSync(out).size / 1048576).toFixed(1)} MB)`)
console.log(`sha256: ${hash.digest("hex")}`)
