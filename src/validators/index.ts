import { z } from "zod"

export const userSchema = z.object({
    userName: z.string().min(3).max(20),
    email: z.string().email("Invalid email"),
    password: z.string().min(8,{message:"Must be at least 8 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message: 'Must contain at least one uppercase, one lowercase, one number, and one special character'}),
})

export type User = z.infer<typeof userSchema>