/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../app/lib/auth";
import { Role } from "../generated/prisma/enums";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
                image?: string | null;
            };
        }
    }
}

const authMiddleware = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.cookie
            // console.log('Cookie from frontnd ---', token)

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - No cookie found",
                });
            }

            //  Pass full cookie header to betterAuth
            const session = await betterAuth.api.getSession({
                headers: req.headers as any,
            });

            console.log("session backend =============================", session)

            if (!session || !session.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - Invalid session",
                });
            }

            // if (!session.user.emailVerified) {
            //     return res.status(403).json({
            //         success: false,
            //         message: "Please verify your email first",
            //     });
            // }

            // Inject user into request
            req.user = {
                id: session?.user?.id,
                email: session?.user?.email,
                name: session?.user?.name,
                role: session?.user?.role as string,
                emailVerified: session?.user?.emailVerified,
                image: session?.user?.image ?? null,
            };

            // Role check (optional)
            if (roles.length && !roles.includes(req.user.role as Role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden - Insufficient permission",
                });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(500).json({
                success: false,
                message: "Authentication failed",
            });
        }
    };
};

export default authMiddleware;