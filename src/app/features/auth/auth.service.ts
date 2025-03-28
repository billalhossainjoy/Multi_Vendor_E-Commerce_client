import ApiClient from "../../../lib/client.ts";
import {TLoginSchema} from "../../../schema/auth.schema.ts";
import toast from "react-hot-toast";
import {isAxiosError} from "axios";

export class AuthService {
    static async register<T, >(formData: FormData) {
        try {
            const response = await ApiClient.post<T>("/auth/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            toast.success("Signup successfully")

            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }

    static async login<T, >(data: TLoginSchema) {
        try {
            const response = await ApiClient.post<T>("/auth/login", data)
            toast.success("Login successfully")
            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }

    static async logout() {
        try {
            const response = await ApiClient.get("/auth/logout")
            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }

    static async refreshToken() {
        try {
            const response = await ApiClient.get("/auth/refresh-token")
            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }

    static async verification(token : string) {
        try {
            const response = await ApiClient.get(`/auth/verify-account/${token}`)
            toast.success("Verification successfully.")
            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }

    static async forgottenPassword(email: string) {
        try {
            const response = await ApiClient.post(`/auth/forgotten/new`,{email})
            toast.success("Email send successfully.")
            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }

    static async ResetPassword(password: string, token: string) {
        try {
            const response = await ApiClient.post(`/auth/forgotten/token/${token}`,{password})
            toast.success("Password changed successfully.")
            return response.data
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message)
            else toast.error("Something went wrong.")
            throw error
        }
    }
}