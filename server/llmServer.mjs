import http from "node:http";

const PORT = 3001;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  response.end(JSON.stringify(payload));
}

function extractOutputText(apiResponse) {
  if (typeof apiResponse.output_text === "string") {
    return apiResponse.output_text;
  }

  if (Array.isArray(apiResponse.output)) {
    const textParts = [];

    for (const item of apiResponse.output) {
      if (!Array.isArray(item.content)) {
        continue;
      }

      for (const contentItem of item.content) {
        if (typeof contentItem.text === "string") {
          textParts.push(contentItem.text);
        }
      }
    }

    return textParts.join("\n");
  }

  return "";
}

function parseToolRequests(rawText) {
  const cleanedText = rawText
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  const parsed = JSON.parse(cleanedText);

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (Array.isArray(parsed.toolRequests)) {
    return parsed.toolRequests;
  }

  throw new Error("LLM response did not contain a ToolRequest array.");
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    return sendJson(response, 200, {});
  }

  if (request.method !== "POST" || request.url !== "/api/tool-requests") {
    return sendJson(response, 404, {
      error: "Not found",
    });
  }

  if (!OPENAI_API_KEY) {
    return sendJson(response, 500, {
      error: "OPENAI_API_KEY is not configured.",
    });
  }

  try {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", async () => {
      const parsedBody = JSON.parse(body);
      const message = parsedBody.message;

      const instructions = `
You are the tool-selection layer for a chat-first NBA trade assistant.

Your job:
Convert the user's natural language trade request into ToolRequest JSON.

Return ONLY valid JSON.
Do not include markdown.
Do not include commentary.

Available tools:

1. setTeams
Arguments:
- teamA
- teamB

2. addPlayer
Arguments:
- player
- fromTeam
- toTeam

3. requestVerdict
Arguments:
- none

Rules:
- Use setTeams when two teams can be identified.
- Use addPlayer when a player movement can be identified.
- Always include requestVerdict as the final tool request.
- Do not invent unsupported tools.
- If the request is unclear, return only requestVerdict.

Examples:

User:
Trade LeBron to Boston

Output:
[
  {
    "tool": "setTeams",
    "arguments": {
      "teamA": "Los Angeles Lakers",
      "teamB": "Boston Celtics"
    }
  },
  {
    "tool": "addPlayer",
    "arguments": {
      "player": "LeBron James",
      "fromTeam": "Los Angeles Lakers",
      "toTeam": "Boston Celtics"
    }
  },
  {
    "tool": "requestVerdict",
    "arguments": {}
  }
]

User:
Trade Curry to Miami

Output:
[
  {
    "tool": "setTeams",
    "arguments": {
      "teamA": "Golden State Warriors",
      "teamB": "Miami Heat"
    }
  },
  {
    "tool": "addPlayer",
    "arguments": {
      "player": "Stephen Curry",
      "fromTeam": "Golden State Warriors",
      "toTeam": "Miami Heat"
    }
  },
  {
    "tool": "requestVerdict",
    "arguments": {}
  }
]
`;

      const apiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          instructions,
          input: message,
          temperature: 0,
        }),
      });

      const apiJson = await apiResponse.json();

      if (!apiResponse.ok) {
        return sendJson(response, apiResponse.status, {
          error: "OpenAI request failed.",
          details: apiJson,
        });
      }

      const outputText = extractOutputText(apiJson);
      const toolRequests = parseToolRequests(outputText);

      return sendJson(response, 200, {
        toolRequests,
      });
    });
  } catch (error) {
    return sendJson(response, 500, {
      error: "LLM server failed.",
      details: String(error),
    });
  }
});

server.listen(PORT, () => {
  console.log(`LLM server running on http://localhost:${PORT}`);
});


