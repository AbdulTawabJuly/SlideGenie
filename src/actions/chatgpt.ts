"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import OpenAI from "openai"
import { v4 as uuidv4 } from 'uuid'
import { ContentItem, ContentType, Slide } from '@/lib/types'
import axios from "axios"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

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



const fallbackImagesURL = [
    "https://drive.google.com/file/d/1KDC6ghZgujMqp4XpGpnYJv5pXTxb3KHG/view?usp=sharing",
    "https://drive.google.com/file/d/1WkTHfpISsuWuefq4LmnmTcuc5Pa8Whep/view?usp=sharing",
    "https://drive.google.com/file/d/15OG1uoQvBFHxBwMDIaKaHRwygmb3jAiW/view?usp=sharing",
    "https://drive.google.com/file/d/1GH9FW5u1HRBuwLb34t29U44waKU0Rr3A/view?usp=sharing"
]

const generateImageUrl = async (prompt: string): Promise<string> => {
    const randomFallback = fallbackImagesURL[Math.floor(Math.random() * fallbackImagesURL.length)]
    const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY
    const endpoint = "https://cloud.leonardo.ai/api/rest/v1/generations"
    
    if (!LEONARDO_API_KEY) {
        console.error('Leonardo API key not found, using fallback image')
        return randomFallback
    }

    try {
        const improvedPrompt = `
        Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture. 
        Description: ${prompt}
        Important Notes:
        - The image must be in a photorealistic style and visually compelling.
        - Ensure all text, signs, or visible writing in the image are in English.
        - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
        - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
        - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.
        `

        // Step 1: Generate the image
        const { data: generateResponse } = await axios.post(
            endpoint,
            {
                height: 536,
                prompt: improvedPrompt,
                modelId: "aa77f04e-3eec-4034-9c07-d0f619684628", // Leonardo Kino XL model
                width: 720,
                alchemy: true,
                photoReal: true,
                photoRealVersion: "v2",
                presetStyle: "STOCK_PHOTO",
                num_images: 1,
            },
            { 
                headers: { 
                    Authorization: `Bearer ${LEONARDO_API_KEY}`,
                    'Content-Type': 'application/json'
                } 
            }
        )

        const generationId = generateResponse?.sdGenerationJob?.generationId
        if (!generationId) {
            console.error('No generation ID received from Leonardo AI')
            return randomFallback
        }

        // Step 2: Poll for completion
        const imageUrl = await new Promise<string>((resolve) => {
            let tries = 0
            const maxTries = 20 // Maximum polling attempts (100 seconds)
            
            const interval = setInterval(async () => {
                tries++
                
                if (tries > maxTries) {
                    clearInterval(interval)
                    resolve(randomFallback)
                    return
                }

                try {
                    const { data: getGenerationResponse } = await axios.get(
                        `${endpoint}/${generationId}`,
                        {
                            headers: { 
                                Authorization: `Bearer ${LEONARDO_API_KEY}` 
                            }
                        }
                    )

                    const generatedImages = getGenerationResponse?.generations_by_pk?.generated_images
                    if (generatedImages && generatedImages.length > 0) {
                        clearInterval(interval)
                        resolve(generatedImages[0].url)
                    }
                } catch (error) {
                    console.error('Error polling Leonardo AI:', error)
                    clearInterval(interval)
                    resolve(randomFallback)
                }
            }, 5000) // Poll every 5 seconds
        })

        console.log('🟢 Image generated successfully with Leonardo AI:', imageUrl)
        return imageUrl || randomFallback

    } catch (error) {
        console.error('Failed to generate image with Leonardo AI:', error)
        return randomFallback
    }
}


const findImageComponents = (layout: ContentItem): ContentItem[] => {
    const images = []
    if (layout.type === 'image') {
        images.push(layout)
    }
    if (Array.isArray(layout.content)) {
        layout.content.forEach((child) => {
            images.push(...findImageComponents(child as ContentItem))
        })
    } else if (layout.content && typeof layout.content === 'object') {
        images.push(...findImageComponents(layout.content))
    }
    return images
}

const replaceImagePlaceholders = async (layout: Slide) => {
    const imageComponents = findImageComponents(layout.content)
    console.log('🟢 Found image components:', imageComponents)
    for (const component of imageComponents) {
        console.log('🟢 Generating image for component:', component.alt)
        component.content = await generateImageUrl(
            component.alt || 'Placeholder Image'
        )
    }
}

//5. **Exactly one image placeholder per layout**—each slide must include one (and only one) image component with a placeholder URL and appropriate alt text.


export const generateLayoutsJson = async (outlineArray: string[]) => {
    const prompt = `### Guidelines
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

Use these outlines as a starting point for the content of the presentations 
  ${JSON.stringify(outlineArray)}

The output must be an array of JSON objects.
  1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
  2. Ensuring each layout is unique.
  3. Adhere to the structure of existing layouts
  4. Fill placeholder data into content fields where required.
  5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
  6. Ensure proper formatting and schema alignment for the output JSON.
  7. First create LAYOUTS TYPES  at the top most level of the JSON output as follows ${JSON.stringify(
        [
            {
                slideName: 'Blank card',
                type: 'blank-card',
                className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
                content: {},
            },
        ]
    )}

  8.The content property of each LAYOUTS TYPE should start with “column” and within the columns content property you can use any  of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string.Here is an example of what 1 layout with 1 column with 1 title inside would look like:
  ${JSON.stringify([
        {
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
    ])}


  9. Here is a final example of an example output for you to get an idea 
  ${JSON.stringify([
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
                                    'https://drive.google.com/file/d/1GH9FW5u1HRBuwLb34t29U44waKU0Rr3A/view?usp=sharing',
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
    ])}

    10.Table slides are optional, but if you choose to include one it must look exactly like this:
    ${JSON.stringify([

        {
            "slideName": "<something appropriate>",
            "type": "tableLayout",
            "className": "<your usual styling>",
            "content": {
                "id": "<uuid>",
                "type": "column",
                "name": "Column",
                "content": [
                    {
                        "id": "<uuid>",
                        "type": "table",
                        "name": "Table",
                        "content": [
                            ["Header1", "Header2"],
                            ["Row1Col1", "Row1Col2"],
                            ["Row2Col1", "Row2Col2"],
                            ["Row3Col1", "Row3Col2"]
                        ]
                    }
                ]
            }
        }
    ])}

  For Images 
   - The alt text should describe the image clearly and concisely.
   - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
   - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
   - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning  
   Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
    `
    try {
        console.log('🟢 Generating layouts...')
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You generate JSON layouts for presentations.',
                },
                { role: 'user', content: prompt },
            ],
            max_tokens: 5000,
            temperature: 0.7,
        })

        const responseContent = completion?.choices?.[0]?.message?.content

        if (!responseContent) {
            return { status: 400, error: 'No content generated' }
        }

        let jsonResponse
        try {
            jsonResponse = JSON.parse(responseContent.replace(/```json|```/g, ''))
            await Promise.all(jsonResponse.map(replaceImagePlaceholders))
        } catch (error) {
            console.log('🔴 ERROR:', error)
            throw new Error('Invalid JSON format received from AI')
        }

        console.log('🟢 Layouts generated successfully')
        return { status: 200, data: jsonResponse }
    } catch (error) {
        console.error('🔴 ERROR:', error)
        return { status: 500, error: 'Internal server error' }
    }
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

        if (!userExist) {
            return {
                status: 403,
                error: "User not found in the Database"
            }
        }
        const project = await client.project.findUnique({
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


// const generateImageUrl = async (prompt: string): Promise<string> => {
//     const randomFallback =
//         fallbackImagesURL[Math.floor(Math.random() * fallbackImagesURL.length)]
//     try {
//         const improvedPrompt = `
//         Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture. 
//             Description: ${prompt}
//             Important Notes:
//             - The image must be in a photorealistic style and visually compelling.
//             - Ensure all text, signs, or visible writing in the image are in English.
//             - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
//             - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
//             - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.
//             Example Use Cases: Business presentations, educational slides.
//         `



//         const dalleResponse = await openai.images.generate({
//             model: "dall-e-3",
//             prompt: improvedPrompt,
//             n: 1,
//             size: '1024x1024',
//         })
//         console.log('🟢 Image generated successfully:', dalleResponse.data[0]?.url)

//         return dalleResponse.data[0]?.url || randomFallback
//     } catch (error) {
//         console.error('Failed to generate image:', error)
//         return randomFallback
//     }
// }