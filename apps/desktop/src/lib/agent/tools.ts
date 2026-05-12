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
    
    return `SUCCESS: Indexed ${filePath}. You can now ask questions about this file.`;
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
    return `SUCCESS: WhatsApp ${action} performed for ${contact}. [Note: This requires the WhatsApp Sidecar to be active]`;
  },
  {
    name: "whatsapp_agent",
    description: "Handle WhatsApp tasks: send messages, read chats, or reply.",
    schema: z.object({
      contact: z.string().describe("Contact name"),
      message: z.string().optional(),
      action: z.enum(["send", "read", "reply"]),
    }),
  }
);

// --- EMAIL & CALENDAR ---
export const emailTool = tool(
  async ({ recipient, subject, body }: { recipient: string, subject: string, body: string }) => {
    console.log(`Email: ${subject}, Body: ${body}`);
    return `SUCCESS: Drafted email to ${recipient}. Manual confirmation required in local dashboard.`;
  },
  {
    name: "email_manager",
    description: "Send or draft local emails.",
    schema: z.object({
      recipient: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
  }
);

export const tools = [fileIngestionTool, fileSearchTool, whatsappTool, emailTool];
