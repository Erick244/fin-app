import axios from "@/lib/axios";
import { SignUpFormData } from "@/schemas/SignUp.schema";

export async function signUp(data: SignUpFormData): Promise<void> {
    try {
        await axios.post("/auth/signup", data);
    } catch (e: any) {
        throw e;
    }
}
