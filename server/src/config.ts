const valueOrError = (value: any): string  => {
    if(!value) throw new Error('Invalid env value')
    return value as string
}

export default {
    ME_URL: valueOrError(process.env.ME_URL),
    FRONT_SECRET: valueOrError(process.env.FRONT_SECRET),
    PORT: Number(valueOrError(process.env.PORT)),
    MONGODB_URI: valueOrError(process.env.MONGODB_URI),
    DB_NAME: valueOrError(process.env.MONGO_DB_NAME),
}
