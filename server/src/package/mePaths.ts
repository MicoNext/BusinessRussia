import fs from "fs/promises"
import { join } from "path"

export default async (storageType: "public") => {
    async function folderChecked(dirPath: string) {
        try {
            await fs.access(dirPath)
        } catch (e) {
            await fs.mkdir(dirPath, { recursive: true })
        }
    }
    await folderChecked(join(__dirname, "..", "..", "public"))

    switch (storageType) {
        case "public": return join(__dirname, "..", "..", "public")
        default: throw new Error("invalid key")
    }
}