"use server"
import OpenAI from "openai"

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

        return { status : 400 , error: "No Content Generated "}
    } catch (error) {
        console.error("😶‍🌫️ Error", error)
        return { status: 500, error: "Internal Server Error" }
    }

}