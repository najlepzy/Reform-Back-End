import z from "zod";

const userValidation = z.object({
    email: z.string().max(12),
    password:z.string().min(8).max(16)
});

export default userValidation;
