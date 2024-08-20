import { z } from "zod";

export const envSchema = z.object({  
    MONGODB_URI: z.string().min(1),
});

export class ConfigError extends Error {
    public errors: any;

    constructor(msg: string, error: z.ZodError) {
        super(msg);

        this.errors = error.flatten();
    }
}

export type EnvironmentConfig = z.infer<typeof envSchema>;

export const loadEnvironmentConfig = (): EnvironmentConfig => {
    try {
        return envSchema.parse(process.env);
    }   catch (error: any) {
        throw new ConfigError("Invalid Environment Variables", error as z.ZodError);
    }
};