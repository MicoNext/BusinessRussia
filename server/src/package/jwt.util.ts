export const cheackJwtInHeader = async (req: any, reply: any, next: () => void) => {
    try {
        await req.jwtVerify({})
        next()
    } catch (e) {
        return reply.status(401).send({ errorMsg: "Not Auth" })
    }
}
