import env from "../../../env"

export default {
    MeUrl: env["ME_URL"],
    ServerUrl: env["SERVER_URL"],
    ymap: {
        ymapApiKey: env["YMAP_API_KEY"],
		centerCoordinates:env["YMAP_COORDINATES"],
		zoomDefault: 15,
    }
}
