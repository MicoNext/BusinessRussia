import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios'
class ApiAdminService {
    private axiosInstance: AxiosInstance
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:6969',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })
        this.setupInterceptors()
    }
    private setupInterceptors() {
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {

                const originalRequest = error.config

                if (originalRequest && error.response?.status === 401 && !(originalRequest as any)._retry) {
                    (originalRequest as any)._retry = true
                    localStorage.removeItem('token')
                }
                return Promise.reject(error)
            }
        )
    }
    async callApi({ path, method }: { path: string, method: 'get' | 'delete' }): Promise<any> {
        try {
            return await this.axiosInstance[method](
                path,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                },
            ).then(r => r.data)
        } catch (e) {
            throw e
        }
    }
    async callApiBody({ path, method, body }: { path: string, method: 'post' | 'put', body: any }): Promise<any> {
        try {
            return await this.axiosInstance[method](
                path,
                body,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                },
            ).then(r => r.data)
        } catch (e) {
            throw e
        }
    }
}
export default new ApiAdminService()

