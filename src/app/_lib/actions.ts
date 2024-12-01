"use server"

import { redirect } from "next/navigation"
import { createSession, getSession, getUserById, getUserByLogin, insertUser, removeSession, updateSessionExpiry } from "./model"
import bcrypt from "bcrypt"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"
import { ISession, IUser } from "./types"

interface IState {
    message: string
}

export const handleSignup = async (prevState: IState, form: FormData) => {
    const name = form.get("name") as string
    const surname = form.get("surname") as string
    const login = form.get("login") as string
    let password = form.get("password") as string

    if (!name.trim() || !surname.trim() || !login.trim() || !password.trim()) {
        return { message: "Please fill all the fields" }
    }

    if (password.length < 6) {
        return { message: "Password is too short!!!" }
    }

    const found = getUserByLogin(login)
    if (found) {
        return { message: "Login is busy!" }
    }

    password = await bcrypt.hash(password, 10)

    const result = insertUser({ login, password, name, surname })
    if (result.changes) {
        return redirect("/login")
    } else {
        return { message: "Internal server error!" }
    }
}

export const handleLogin = async (state: IState, form: FormData) => {
    const login = form.get("login") as string
    const password = form.get("password") as string
    const found = getUserByLogin(login)

    if (!found) {
        return { message: "User not found" }
    }

    const result = await bcrypt.compare(password, found.password)

    if (!result) {
        return { message: "Wrong credentials" }
    }

    const token = nanoid()
    createSession(found.id, token);
    (await cookies()).set("token", token)

    return redirect("/profile")

}

export const verifyUser = async () => {
    let userToken = (await cookies()).get("token")
    if (!userToken) {
        return redirect("/login")
    }

    const storedUser = await getSession(userToken.value) as ISession
    if (!storedUser) {
        return redirect("/login")
    }

    const { id, user_id, expires } = storedUser

    if (Date.now() - expires > 1000 * 60 * 2) {
        (await cookies()).delete("token")
        await removeSession(id)
        return null
    }

    await updateSessionExpiry(id, Date.now() + 1000 * 60 * 2)

    return await getUserById(user_id) as IUser
}

export const handleSignout = async () => {
    const token = (await cookies()).get("token")
    if (token) {
        (await cookies()).delete("token")
        await removeSession(token.value)
        return redirect("/login")
    }
}
