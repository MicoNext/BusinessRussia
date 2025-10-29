import axios, { type AxiosInstance } from 'axios'
import config from '../config/config'
class ApiAuthService {
    private axiosInstance: AxiosInstance
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.ServerUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    async signin(login: string, password: string) {
        try {
            return await this.axiosInstance.post(
                `/api/signin`,
                { login, password },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then(r => {
                localStorage.setItem('token', r.data.accessToken)
            })
        } catch (e) {
            throw e
        }
    }
}
export default new ApiAuthService()
