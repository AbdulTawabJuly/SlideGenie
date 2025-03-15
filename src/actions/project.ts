"use server"

import { client } from "@/lib/prisma"
import { onAuthenticateUser } from "./user"
import { OutlineCard } from "@/lib/types"

export const getAllProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "User Not Authenticated" }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: "desc",
            }
        })

        if (projects.length === 0) {
            return { status: 404, error: "No Projects Found" }
        }

        return { status: 200, data: projects }
    } catch (error) {
        console.log("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }

}

export const getRecentProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "User Not Authenticated" }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },

            orderBy: {
                updatedAt: "desc",
            },
            take: 5,
        })

        if (projects.length === 0) {
            return {
                status: 404,
                error: "No Recent Projects Available"
            }
        }
        return { status: 200, data: projects }
    } catch (error) {
        console.log("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }
}

export const recoverProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "User Not Authenticated" }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId
            },
            data: {
                isDeleted: false
            }
        })

        if (!updatedProject) {
            return { status: 500, error: "Failed to update project" }
        }
        return { status: 200, data: updatedProject }
    } catch (error) {
        console.log("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }
}

export const deleteProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "User Not Authenticated" }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId
            },
            data: {
                isDeleted: true
            }
        })

        if (!updatedProject) {
            return { status: 500, error: "Failed to delete project" }
        }
        return { status: 200, data: updatedProject }
    } catch (error) {
        console.log("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }
}

export const createProject = async (title: string, outlines: OutlineCard[]) => {
    try {
        if (!title || !outlines || outlines.length === 0) {
            return { status: 400, error: "Title and Outlines are Required" }
        }
        const allOutlines = outlines.map((outline) => outline.title)
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "User Not Authenticated" }
        }
        const project = await client.project.create({
            data: {
                title,
                outlines: allOutlines,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: checkUser.user.id,
            }
        })

        if (!project) {
            return { status: 500, error: "Failed to create project" }
        }
        return { status: 200, data: project }
    } catch (error) {
        console.log("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }

}

export const getProjectById = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "User Not Authenticated" }
        }
        const project = await client.project.findFirst({
            where: { id: projectId },
        })
        if (!project) {
            return { status: 404, error: "Project Not Found" }
        }
        return { status: 200, data: project }
    } catch (error) {
        console.error("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }
}