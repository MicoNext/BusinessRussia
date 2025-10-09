import mysql from 'mysql2/promise'
import config from './config'


export const execute = async (query: string, data: Array<any> | null = null) =>  {
    try {
        const poll: any = await mysql.createPool(config)
        const result = await poll.execute(query, data && data)

        return result
    }
    catch (e: any) {
        console.log(e)
        throw new Error()
    }
}