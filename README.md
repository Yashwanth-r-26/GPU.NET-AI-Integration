# Image Generator (AI Integration)
A newly added sidebar feature that allows users to generate high-quality AI images using third-party vendors. Currently, the integration only supports Leonardo AI.

# Features
1) Prompt Input: Enter any creative prompt to describe the image you want.
2) Negative Prompt: Define elements you want to avoid in the generated image (e.g., “blurry, distorted, dark background”).

# Tool Configuration Options
All image generation options are customizable:

# Option	Description
1)Width:	Width of the generated image. Must be between 32 and 1536 pixels and a multiple of 8.<br/>
2)Height:	Height of the generated image. Also between 32 and 1536 pixels and a multiple of 8.<br/>
3)Samples:	Number of image variations to generate per request (range: 1 to 4).<br/>
4)Guidance Scale:	Controls how closely the generation follows your prompt. Values range from 7 to 20:<br/>
    - Lower values = more freedom, potentially more abstract.<br/>
    - Higher values = stricter adherence to prompt.<br/>
5)Inference Steps:	Number of steps used to progressively build the image. Values between 10 and 15:<br/>
    - More steps = higher quality and detail, but slower.<br/>
    - Fewer steps = faster but potentially less accurate.<br/>

# Example Use Case

Prompt: "A futuristic city skyline at sunset"<br/>
Negative Prompt: "blurry, low quality, grayscale"<br/>
Width: 1024<br/>
Height: 512<br/>
Samples: 2<br/>
Guidance Scale: 12<br/>
Steps: 15<br/>
This would generate 2 high-quality variations of a futuristic sunset cityscape, avoiding blurry or grayscale elements.

### Technology Stack
1)React + TypeScript<br/>
2)CSS<br/>
3)Vite<br/>
4)Leonardo.Ai REST API<br/>
