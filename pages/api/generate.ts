import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { industry, customBrand } = req.body;

  const prompt = `You are a creative strategist and brand identity expert.
I want you to create a full, detailed branding case study for my creative offer: art direction, identity design, typography, color system, and artistic storytelling for new brands.

My positioning:
- I help new brands express their soul visually through a coherent, emotional identity.
- My visual universe is artistic, introspective, and premium (inspired by versopic.human — Moroccan, human-centered, and ethical).
- My target clients are new founders, fashion projects, artistic brands, and small startups that want a strong visual direction.

Your task:
Create a fictional but realistic case study showing what I could deliver for a real client${customBrand ? ` in the ${customBrand} industry` : industry ? ` in the ${industry} industry` : ''}.

The case study must include the following sections:

1. Client Background
- Describe the type of brand
- Explain their initial problem or lack of visual direction.

2. Challenge
- What was missing? (brand consistency, unclear visual message, lack of identity, etc.)
- Describe what emotional or aesthetic issue the brand faced.

3. Creative Process
- Describe the exploration phase (moodboard, tone, creative research).
- Explain the choice of typography, colors, and artistic style.
- Mention the story behind the brand's artistic direction.

4. Solution / Outcome
Show what the final identity looked like:
- Logo concept and meaning
- Color palette and symbolism
- Typography choice and how it supports the message
- Visual direction (textures, photography style, art direction)
- Explain how these elements transformed the brand's perception.

5. Result / Impact
- Describe the brand's transformation: how it now feels more coherent, premium, and human.
- Mention hypothetical outcomes (increase in engagement, recognition, or emotional impact).

6. Visual Presentation Ideas
- Suggest what visuals or mockups could be shown (e.g., posters, hoodie mockups, IG visuals, web headers).

7. Key Learnings / Artistic Message
- Summarize what this project taught about creating identity through emotion and artistic depth.

Tone and Style:
- Write in a cinematic, storytelling tone, mixing strategy and art.
- Use short, impactful sentences.
- Feel free to add emotional storytelling (as if it were a short film about visual identity).
- Include small poetic lines like "Every brand begins with a feeling."

Output: a complete written case study ready to publish on my website or Instagram carousel.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a creative strategist and brand identity expert specializing in artistic, human-centered brand direction.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2500,
    });

    const caseStudy = completion.choices[0]?.message?.content || '';

    res.status(200).json({ caseStudy });
  } catch (error: any) {
    console.error('Error generating case study:', error);
    res.status(500).json({ error: error.message || 'Failed to generate case study' });
  }
}
