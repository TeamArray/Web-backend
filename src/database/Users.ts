import { Database } from "../index"
import UserModel from "../models/UserModel"

export function GetUserByID(userID: string) {
    return new Promise(async (resolve: (User: UserModel | undefined) => void, reject) => {
        const [user] = await Database.select('*').where('userid', userID).from('users')
        resolve(user)
    })
}