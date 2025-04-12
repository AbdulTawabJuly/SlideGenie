"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import OpenAI from "openai"
import { isDataView } from "util/types"
import { v4 as uuidv4 } from 'uuid'
import { ContentType } from '@/lib/types'



export const generateCreativePrompt = async (userPrompt: string) => {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    const finalPrompt = `
    Create a coherent and relevant outline for the following prompt : ${userPrompt}.
    The outline should consist of atleast 6 points, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic.
    Return the output in the following JSON format:

    {
        "outlines": [
            "Point 1",
            "Point 2",
            "Point 3",
            "Point 4",
            "Point 5",
            "Point 6",
        ]
    }

    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanation outside the JSON.
    `

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI that generates outlines for presentations."
                },
                {
                    role: "user",
                    content: finalPrompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.0,
        })

        const responseContent = completion.choices[0].message?.content

        if (responseContent) {
            try {
                const cleanedContent = responseContent.replace(/```json|```/g, "").trim(); // Remove markdown formatting
                const jsonResponse = JSON.parse(cleanedContent)
                return { status: 200, data: jsonResponse }
            } catch (error) {
                console.error("Invalid JSON Received : ", responseContent, error)
                return { status: 500, error: "Invalid JSON Format Received from AI" }
            }
        }

        return { status: 400, error: "No Content Generated " }
    } catch (error) {
        console.error("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }

}

const existingLayouts = [
    {
        id: uuidv4(),
        slideName: 'Blank card',
        type: 'blank-card',
        className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'title' as ContentType,
                    name: 'Title',
                    content: '',
                    placeholder: 'Untitled Card',
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Accent left',
        type: 'accentLeft',
        className: 'min-h-[300px]',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            restrictDropTo: true,
            content: [
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Resizable column',
                    restrictToDrop: true,
                    content: [
                        {
                            id: uuidv4(),
                            type: 'image' as ContentType,
                            name: 'Image',
                            content:
                                'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            alt: 'Title',
                        },
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'heading1' as ContentType,
                                    name: 'Heading1',
                                    content: '',
                                    placeholder: 'Heading1',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'paragraph' as ContentType,
                                    name: 'Paragraph',
                                    content: '',
                                    placeholder: 'start typing here',
                                },
                            ],
                            className: 'w-full h-full p-8 flex justify-center items-center',
                            placeholder: 'Heading1',
                        },
                    ],
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Accent Right',
        type: 'accentRight',
        className: 'min-h-[300px]',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Resizable column',
                    restrictToDrop: true,
                    content: [
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'heading1' as ContentType,
                                    name: 'Heading1',
                                    content: '',
                                    placeholder: 'Heading1',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'paragraph' as ContentType,
                                    name: 'Paragraph',
                                    content: '',
                                    placeholder: 'start typing here',
                                },
                            ],
                            className: 'w-full h-full p-8 flex justify-center items-center',
                            placeholder: 'Heading1',
                        },
                        {
                            id: uuidv4(),
                            type: 'image' as ContentType,
                            name: 'Image',
                            restrictToDrop: true,
                            content:
                                'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            alt: 'Title',
                        },
                    ],
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Image and text',
        type: 'imageAndText',
        className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Image and text',
                    className: 'border',
                    content: [
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'image' as ContentType,
                                    name: 'Image',
                                    className: 'p-3',
                                    content:
                                        'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    alt: 'Title',
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'heading1' as ContentType,
                                    name: 'Heading1',
                                    content: '',
                                    placeholder: 'Heading1',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'paragraph' as ContentType,
                                    name: 'Paragraph',
                                    content: '',
                                    placeholder: 'start typing here',
                                },
                            ],
                            className: 'w-full h-full p-8 flex justify-center items-center',
                            placeholder: 'Heading1',
                        },
                    ],
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Text and image',
        type: 'textAndImage',
        className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Text and image',
                    className: 'border',
                    content: [
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: '',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'heading1' as ContentType,
                                    name: 'Heading1',
                                    content: '',
                                    placeholder: 'Heading1',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'paragraph' as ContentType,
                                    name: 'Paragraph',
                                    content: '',
                                    placeholder: 'start typing here',
                                },
                            ],
                            className: 'w-full h-full p-8 flex justify-center items-center',
                            placeholder: 'Heading1',
                        },
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'image' as ContentType,
                                    name: 'Image',
                                    className: 'p-3',
                                    content:
                                        'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    alt: 'Title',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Two columns',
        type: 'twoColumns',
        className: 'p-4 mx-auto flex justify-center items-center',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'title' as ContentType,
                    name: 'Title',
                    content: '',
                    placeholder: 'Untitled Card',
                },
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Text and image',
                    className: 'border',
                    content: [
                        {
                            id: uuidv4(),
                            type: 'paragraph' as ContentType,
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        },
                        {
                            id: uuidv4(),
                            type: 'paragraph' as ContentType,
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        },
                    ],
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Two columns with headings',
        type: 'twoColumnsWithHeadings',
        className: 'p-4 mx-auto flex justify-center items-center',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'title' as ContentType,
                    name: 'Title',
                    content: '',
                    placeholder: 'Untitled Card',
                },
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Text and image',
                    className: 'border',
                    content: [
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'heading3' as ContentType,
                                    name: 'Heading3',
                                    content: '',
                                    placeholder: 'Heading 3',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'paragraph' as ContentType,
                                    name: 'Paragraph',
                                    content: '',
                                    placeholder: 'Start typing...',
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            type: 'column' as ContentType,
                            name: 'Column',
                            content: [
                                {
                                    id: uuidv4(),
                                    type: 'heading3' as ContentType,
                                    name: 'Heading3',
                                    content: '',
                                    placeholder: 'Heading 3',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'paragraph' as ContentType,
                                    name: 'Paragraph',
                                    content: '',
                                    placeholder: 'Start typing...',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },

    {
        id: uuidv4(),
        slideName: 'Three column',
        type: 'threeColumns',
        className: 'p-4 mx-auto flex justify-center items-center',
        content: {
            id: uuidv4(),
            type: 'column' as ContentType,
            name: 'Column',
            content: [
                {
                    id: uuidv4(),
                    type: 'title' as ContentType,
                    name: 'Title',
                    content: '',
                    placeholder: 'Untitled Card',
                },
                {
                    id: uuidv4(),
                    type: 'resizable-column' as ContentType,
                    name: 'Text and image',
                    className: 'border',
                    content: [
                        {
                            id: uuidv4(),
                            type: 'paragraph' as ContentType,
                            name: '',
                            content: '',
                            placeholder: 'Start typing...',
                        },
                        {
                            id: uuidv4(),
                            type: 'paragraph' as ContentType,
                            name: '',
                            content: '',
                            placeholder: 'Start typing...',
                        },
                        {
                            id: uuidv4(),
                            type: 'paragraph' as ContentType,
                            name: '',
                            content: '',
                            placeholder: 'Start typing...',
                        },
                    ],
                },
            ],
        },
    },
]


export const generateLayoutsJson = async () => {


}


export const generateLayouts = async (projectId: string, theme: string) => {

    try {
        if (!projectId) {
            return { status: 400, error: "Project ID is required" }
        }
        const user = await currentUser()
        if (!user) {
            return { status: 403, error: "User not Authenticated" }
        }

        const userExist = await client.user.findUnique({
            where: { clerkId: user.id }
        })

        if (!userExist || !userExist.subscription) {
            return {
                status: 403,
                error: !userExist?.subscription ? "User Does not have an active subscription" : "User not found in the Database"
            }
        }
        const project = await cleint.project.findUnique({
            where: { id: projectId, isDeleted: false }
        })

        if (!project) {
            return { status: 404, error: "Project Not Found" }
        }
        if (!project.outlines || project.outlines.length === 0) {
            return { status: 400, error: "No Outlines Found for the Project" }
        }

        const layouts = await generateLayoutsJson(project.outlines)

        if (layouts.status !== 200) {
            return layouts
        }

        await client.project.update({
            where: { id: projectId },
            data: { slides: layouts.data, themeName: theme },
        })

        return { status: 200, data: layouts.data }

    } catch (error) {
        console.error("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error", data: [] }
    }

}