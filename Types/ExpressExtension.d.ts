import UserModel from "../src/models/UserModel"

declare global{
    namespace Express{
        export interface Request{
            user:UserModel
        }
    }
}