import { StatusCodes } from "http-status-codes";
import AppError from "../app/errors/AppError";
import { prisma } from "../app/lib/prisma";
import { Role } from "../generated/prisma/enums";

async function seedAdmin() {
    try {
        console.log("***** Admin Seeding Started....");

        const adminData = {
            name: "Ebny Buniad",
            email: "ebnybuniad@gmail.com",
            password: "admin12345",
            role: Role.SUPER_ADMIN,
        };

        const existingUser = await prisma.user.findUnique({
            where: { email: adminData.email }
        });

        if (existingUser) {
            console.log("Super already exists");
            return;
        }

        const res = await fetch(
            "http://localhost:5000/api/auth/sign-up/email",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": `${process.env.APP_URL}`
                },
                body: JSON.stringify(adminData)
            }
        );

        const data = await res.json();

        console.log("STATUS:", res.status);
        console.log("DATA:", data);

        if (!res.ok) throw new AppError(
            StatusCodes.BAD_REQUEST,
            "Signup failed");

        await prisma.user.update({
            where: { email: adminData.email },
            data: {
                emailVerified: true
            }
        });

        console.log("Admin created & verified");
    } catch (error) {
        console.error("Seed failed:", error);
    }
}

seedAdmin();