"use server"

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return { status: 403 }
        }

        const userExists = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                PurchasedProjects: {
                    select: {
                        id: true,
                    },
                },
            },
        })

        if (userExists) {
            return {
                status: 200,
                user: userExists,
            }
        }

        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
                profileImage: user.imageUrl
            }
        })

        if (newUser) {
            return {
                status: 201,
                user: newUser
            }
        }
        return { status: 400 }
    } catch (error) {
        console.log("😶‍🌫️ Error", error)
        return { status: 500 , error: "Internal Server Error" }
    }
}


export const deductCoins = async (amount: number, operation: string) => {
    try {
        const user = await currentUser();
        if (!user) {
            return { status: 403, error: "User not authenticated" }
        }

        const userExists = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                id: true,
                coins: true,
            }
        });

        if (!userExists) {
            return { status: 404, error: "User not found" }
        }

        // Check if user has enough coins
        if (userExists.coins < amount) {
            return { 
                status: 400, 
                error: `Insufficient coins. You need ${amount} coins for ${operation}. Current balance: ${userExists.coins}` 
            }
        }

        // Deduct coins
        const updatedUser = await client.user.update({
            where: {
                clerkId: user.id,
            },
            data: {
                coins: {
                    decrement: amount
                }
            },
            select: {
                id: true,
                coins: true,
            }
        });

        return {
            status: 200,
            user: updatedUser,
            message: `${amount} coins deducted for ${operation}. Remaining balance: ${updatedUser.coins}`
        }

    } catch (error) {
        console.log("😶‍🌫️ Error deducting coins:", error)
        return { status: 500, error: "Internal Server Error" }
    }
}

// Specific function for outline creation
export const deductCoinsForOutline = async () => {
    return await deductCoins(1, "outline creation");
}

// Specific function for slide generation
export const deductCoinsForSlides = async () => {
    return await deductCoins(4, "slide generation");
}

export const addCoins = async (userId: string, coinsToAdd: number, amount: number, lemonSqueezyOrderId?: string) => {
    try {
        // Add coins to user account
        const updatedUser = await client.user.update({
            where: { id: userId },
            data: {
                coins: {
                    increment: coinsToAdd
                }
            },
            select: {
                id: true,
                coins: true,
                name: true,
                email: true
            }
        });

        // Create transaction record
        await client.coinTransaction.create({
            data: {
                userId: userId,
                amount: amount,
                coins: coinsToAdd,
                lemonSqueezyOrderId: lemonSqueezyOrderId,
                status: "completed"
            }
        });

        return {
            status: 200,
            user: updatedUser,
            message: `Successfully added ${coinsToAdd} coins to your account!`
        };

    } catch (error) {
        console.log("😶‍🌫️ Error adding coins:", error);
        return { status: 500, error: "Internal Server Error" };
    }
};
