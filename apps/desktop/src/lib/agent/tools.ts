import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// --- PERSISTENT MEMORY & RAG ---
let vectorStore: MemoryVectorStore | null = null;
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text", 
  baseUrl: "http://localhost:11434",
});

export const fileIngestionTool = tool(
  async ({ filePath, content }: { filePath: string, content: string }) => {
    console.log(`Ingesting file: ${filePath}`);
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const docs = await splitter.createDocuments([content], [{ source: filePath }]);
    
    if (!vectorStore) {
      vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    } else {
      await vectorStore.addDocuments(docs);
    }

    // Persist to manifest for the UI to see
    // const manifestPath = filePath.split('/').slice(0, -1).join('/') + '/manifest.json';
    // const manifest = { last_indexed: new Date().toISOString(), file: filePath, status: "READY" };
    // Note: In a real app we'd use tauri's fs here, but this tool is the agent's logic.
    
    return `SUCCESS: Indexed ${filePath}. Memory Bank updated.`;
  },
  {
    name: "ingest_file",
    description: "Read and index a local file so the AI can answer questions about it later.",
    schema: z.object({
      filePath: z.string().describe("Path to the local file"),
      content: z.string().describe("The text content of the file"),
    }),
  }
);

export const fileSearchTool = tool(
  async ({ query }: { query: string }) => {
    if (!vectorStore) return "ERROR: No files have been indexed yet. Please ingest a file first.";
    
    const results = await vectorStore.similaritySearch(query, 3);
    const context = results.map((r: any) => `[Source: ${r.metadata.source}]: ${r.pageContent}`).join("\n---\n");
    
    return `RELEVANT CONTEXT FROM LOCAL FILES:\n${context}`;
  },
  {
    name: "search_local_knowledge",
    description: "Search through previously indexed local files to answer user questions.",
    schema: z.object({
      query: z.string().describe("The question or search query"),
    }),
  }
);

// --- WHATSAPP TOOL ---
export const whatsappTool = tool(
  async ({ contact, message, action }: { contact: string, message?: string, action: "send" | "read" | "reply" }) => {
    console.log(`Action: ${action}, Msg: ${message}`);
    try {
      if (action === "send" || action === "reply") {
        if (!message) return `ERROR: Message is required for ${action}`;
        const res = await fetch("http://localhost:3005/whatsapp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: contact, message })
        });
        const data = await res.json();
        if (data.error) return `ERROR: WhatsApp failed - ${data.error}`;
        return `SUCCESS: WhatsApp ${action} performed for ${contact}. ID: ${data.id}`;
      } else if (action === "read") {
        const res = await fetch("http://localhost:3005/whatsapp/messages");
        const data = await res.json();
        if (data.error) return `ERROR: WhatsApp failed - ${data.error}`;
        return `SUCCESS: Recent WhatsApp chats retrieved: ${JSON.stringify(data.chats)}`;
      }
      return `ERROR: Unknown action ${action}`;
    } catch (err: any) {
      return `ERROR: Could not connect to WhatsApp integration service - ${err.message}`;
    }
  },
  {
    name: "whatsapp_agent",
    description: "Handle WhatsApp tasks: send messages, read chats, or reply.",
    schema: z.object({
      contact: z.string().describe("Contact name or phone number"),
      message: z.string().optional(),
      action: z.enum(["send", "read", "reply"]),
    }),
  }
);

// --- EMAIL & CALENDAR ---
export const emailTool = tool(
  async ({ recipient, subject, body, action = "send" }: { recipient?: string, subject?: string, body?: string, action?: "send" | "read" }) => {
    try {
      if (action === "send") {
        if (!recipient || !subject || !body) return "ERROR: recipient, subject, and body are required for sending email";
        const res = await fetch("http://localhost:3005/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: recipient, subject, body })
        });
        const data = await res.json();
        if (data.error) return `ERROR: Email failed - ${data.error}`;
        return `SUCCESS: Email sent to ${recipient}. Message ID: ${data.messageId}`;
      } else {
        const res = await fetch("http://localhost:3005/email/inbox");
        const data = await res.json();
        if (data.error) return `ERROR: Email failed - ${data.error}`;
        return `SUCCESS: Fetched unread emails - ${JSON.stringify(data.emails)}`;
      }
    } catch (err: any) {
      return `ERROR: Could not connect to Email integration service - ${err.message}`;
    }
  },
  {
    name: "email_manager",
    description: "Send emails or read inbox via IMAP/SMTP.",
    schema: z.object({
      recipient: z.string().optional(),
      subject: z.string().optional(),
      body: z.string().optional(),
      action: z.enum(["send", "read"]).optional(),
    }),
  }
);

export const tools = [fileIngestionTool, fileSearchTool, whatsappTool, emailTool];
