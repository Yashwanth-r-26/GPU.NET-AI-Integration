import React, { useState } from "react";
// import leonardoai from "@api/leonardoai";
import "./styles/aiGeneration.css";
import.meta.env.VITE_LEONARDO_API_KEY;
const defaultNegativePrompt = "";

const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(defaultNegativePrompt);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(512);
  const [samples, setSamples] = useState(1);
  const [steps, setSteps] = useState(15);
  const [guidance, setGuidance] = useState(7);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const handleGenerate = async () => {
    setLoading(true);
    setImages([]);

    try {
      const apiKey = import.meta.env.VITE_LEONARDO_API_KEY;
      if (!apiKey) throw new Error("Leonardo API key not set");

      const genResponse = await fetch(
        "https://cloud.leonardo.ai/api/rest/v1/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alchemy: true,
            height,
            width,
            modelId: "b24e16ff-06e3-43eb-8d33-4416c2d75876",
            num_images: samples,
            presetStyle: "DYNAMIC",
            prompt,
            negative_prompt: negativePrompt,
            guidance_scale: guidance,
            num_inference_steps: steps,
          }),
        },
      );

      const genData = await genResponse.json();
      const generationId = genData?.sdGenerationJob?.generationId;
      if (!generationId) throw new Error("No generation ID received.");

      const checkStatus = async (attempt = 0) => {
        if (attempt > 30) throw new Error("Timeout waiting for generation.");

        const statusRes = await fetch(
          `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        );
        const statusData = await statusRes.json();
        const status = statusData?.generations_by_pk?.status;

        if (status === "COMPLETE") {
          const imgs = statusData.generations_by_pk.generated_images.map(
            (img: any) => img.url,
          );
          setImages(imgs);
        } else {
          setTimeout(() => checkStatus(attempt + 1), 2000);
        }
      };

      await checkStatus();
    } catch (err) {
      console.error("Leonardo AI generation error:", err);
      alert("Error generating image with Leonardo AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-generator-container">
      <div className="toolbar">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={3}
        />
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="Negative prompts..."
          rows={2}
        />
        <div className="controls">
          <label>
            Width{" "}
            <input
              type="number"
              value={width}
              min={32}
              max={1536}
              step={8}
              onChange={(e) => {
                const val = e.target.value;

                if (val === "") {
                  setWidth(32);
                  return;
                }

                const num = Number(val);
                if (!isNaN(num)) {
                  setWidth(num);
                }
              }}
              onBlur={(e) => {
                const num = Number(e.target.value);

                let adjusted = Math.max(32, Math.min(1536, num));
                adjusted = Math.round(adjusted / 8) * 8;

                setWidth(adjusted);
              }}
            />
          </label>
          <label>
            Height{" "}
            <input
              type="number"
              value={height}
              min={32}
              max={1536}
              step={8}
              onChange={(e) => {
                const val = e.target.value;

                if (val === "") {
                  setHeight(32);
                  return;
                }

                const num = Number(val);
                if (!isNaN(num)) {
                  setHeight(num);
                }
              }}
              onBlur={(e) => {
                const num = Number(e.target.value);

                let adjusted = Math.max(32, Math.min(1536, num));
                adjusted = Math.round(adjusted / 8) * 8;

                setHeight(adjusted);
              }}
            />
          </label>

          <label>
            Samples{" "}
            <input
              type="number"
              value={samples}
              min={1}
              max={4}
              onChange={(e) => setSamples(Number(e.target.value))}
              onKeyDown={(e) => e.preventDefault()}
            />
          </label>
          <label>
            Steps{" "}
            <input
              type="number"
              value={steps}
              min={10}
              max={15}
              onChange={(e) => setSteps(Number(e.target.value))}
              onKeyDown={(e) => e.preventDefault()}
            />
          </label>
          <label>
            Guidance{" "}
            <input
              type="number"
              min={7}
              max={20}
              value={guidance}
              onChange={(e) => setGuidance(Number(e.target.value))}
            />
          </label>
        </div>
        <button
          className="ai-generation-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>
      <div className="results">
        {images.length > 0
          ? images.map((img, idx) => (
              <img key={idx} src={img} alt={`Generated ${idx}`} />
            ))
          : !loading && <p style={{ color: "#999" }}>No images yet.</p>}
      </div>
    </div>
  );
};

export default AIGenerator;
