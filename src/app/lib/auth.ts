import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, } from "../../generated/prisma/enums";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL!],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: Role.USER
            },
            status: {
                type: "string",
                required: true,
                defaultValue: "ACTIVE"
            },
            changePassword: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            isDeleted: {
                type: "boolean",
                returned: true,
                defaultValue: false
            },
            deletedAt: {
                type: "date",
                returned: false,
                defaultValue: null
            }
        }
    }
});