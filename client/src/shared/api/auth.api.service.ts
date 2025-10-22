import axios, { type AxiosInstance } from 'axios'
class ApiAuthService {
    private axiosInstance: AxiosInstance
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:6969',
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
