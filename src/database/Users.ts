import { Database } from "../index"
import UserModel from "../models/UserModel"

export function GetUserByID(userID: string) {
    return new Promise(async (resolve: (User: UserModel | undefined) => void, reject) => {
        const [user] = await Database.select('*').where('userid', userID).from('users')
        resolve(user)
    })
}

export function ExistsUser(userID: string) {
    return new Promise(async (resolve: (exists: boolean) => void, reject) => {
        const [data] = await Database.select('*').where({ userID }).from('users')
        resolve(data != undefined)
    })
}

export function CreateUser(userID: string, passwd:string, pwsalt:string, nicknm:string) {
    return new Promise(async (resolve: (Result:boolean) => void, reject) => {
        await Database.insert({ userid:userID, passwd, pwsalt, nicknm }).into('users')
        resolve(true)
    })
}