import dotenv from "dotenv"
dotenv.config()

function valueOrError(key: string) {
    if(process.env[key]) return process.env[key]
    else throw new Error()
}

export default {
    MeUrl: valueOrError("ME_URL"),
    ServerUrl: valueOrError("SERVER_URL"),
    ymap: {
        ymapApiKey: valueOrError("YMAP_API_KEY"),
		centerCoordinates:valueOrError("YMAP_COORDINATES"),
		zoomDefault: 15,
    }
}
