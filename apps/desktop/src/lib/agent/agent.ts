import { ChatOllama } from "@langchain/ollama";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { tools } from "./tools";

export class ShadowAgent {
  private agent: any;
  private checkpointSaver: MemorySaver;

  constructor() {
    const model = new ChatOllama({
      baseUrl: "http://localhost:11434",
      model: "llama3-groq-tool-use", // Or llama3.1
      temperature: 0.1,
    });

    this.checkpointSaver = new MemorySaver();
    
    this.agent = createReactAgent({
      llm: model,
      tools,
      checkpointSaver: this.checkpointSaver,
    });
  }

  async ask(input: string, threadId: string = "default") {
    const config = { configurable: { thread_id: threadId } };
    
    const stream = await this.agent.stream(
      { messages: [{ role: "user", content: input }] },
      config
    );

    let finalResponse = "";
    let toolCalls: any[] = [];

    for await (const chunk of stream) {
      if (chunk.agent) {
        const lastMsg = chunk.agent.messages[chunk.agent.messages.length - 1];
        if (lastMsg.content) {
          finalResponse = lastMsg.content;
        }
      } else if (chunk.tools) {
        // Collect tool executions for UI feedback
        toolCalls.push(chunk.tools);
      }
    }

    return { content: finalResponse, toolCalls };
  }
}

// Singleton instance
export const shadowAgent = new ShadowAgent();
