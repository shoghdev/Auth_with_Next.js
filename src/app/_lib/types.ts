export interface IUser {
    id: number
    name: string
    surname: string;
    login: string
    password: string
    attempts: number
    time: number
}

export interface ISession {
    id: string
    user_id: number
    expires: number
}

export type InputUser = Omit<IUser, 'id'>