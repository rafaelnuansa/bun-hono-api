import { PrismaClient } from "../generated/prisma/client"

// inisialisasi prisma client
const prisma = new PrismaClient()

// export default prisma agar bisa digunakan di file lain
export default prisma