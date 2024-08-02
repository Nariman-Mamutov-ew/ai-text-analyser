import dotenv from "dotenv";
import { RequestHandler } from "express";
import { Groq, OpenAI } from "llamaindex";

import { MODE } from "./types";

dotenv.config();

const defaultJsonFormat = {
  summary:
    "High-level summary of the call transcript. Should not exceed 3 sentences.",
  persons: "Array of person names if have any",
  subject: "Text subject",
};

export const textAnalyser: RequestHandler = async (req, res, next) => {
  try {
    const {
      text,
      additionalContext,
      expand = false,
      jsonFormat = defaultJsonFormat,
      mode = MODE.GROQ,
    } = req.body;
    if (!text) {
      res.json({
        done: false,
        error: true,
        reason: "Please provide text to analyse",
      });
      next();
    }
    const groqLLM = new Groq({
      additionalChatOptions: { response_format: { type: "json_object" } },
    });
    const OpenAILLM = new OpenAI({
      additionalChatOptions: { response_format: { type: "json_object" } },
    });

    const llm = mode === MODE.GROQ ? groqLLM : OpenAILLM;

    const response = await llm.chat({
      messages: [
        {
          role: "system",
          content: `You are an expert assistant for analysing text.\n\nGenerate a valid JSON in the following format:\n\n${JSON.stringify(
            jsonFormat
          )}. ${
            additionalContext && `Additional content ${additionalContext}`
          } `,
        },
        {
          role: "user",
          content: `Here is the text: \n------\n${text}\n------`,
        },
      ],
    });

    res.json({
      done: true,
      message: response["message"].content,
      ...(expand && { response }),
    });
  } catch (error) {
    console.error("Error during processing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
