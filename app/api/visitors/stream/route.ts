import type { NextRequest } from "next/server";
import type { VisitorDataPoint } from "@/types";
import { visitorEventManager } from "@/lib/pubsub/eventManager";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const initialMessage = `data: ${JSON.stringify({
        type: "connected",
      })}\n\n`;
      controller.enqueue(encoder.encode(initialMessage));

      // Subscribe to visitor updates
      const handleUpdate = (data: VisitorDataPoint[]) => {
        const message = `data: ${JSON.stringify({ type: "update", data })}\n\n`;
        try {
          controller.enqueue(encoder.encode(message));
        } catch (error) {
          console.error("Error sending SSE message:", error);
        }
      };

      visitorEventManager.subscribeToUpdates(handleUpdate);

      // Keep-alive ping every 30 seconds
      const keepAliveInterval = setInterval(() => {
        try {
          const ping = `: keep-alive\n\n`;
          controller.enqueue(encoder.encode(ping));
        } catch (error) {
          console.error("Keep-alive failed:", error);
          clearInterval(keepAliveInterval);
        }
      }, 30000);

      // Cleanup on connection close
      request.signal.addEventListener("abort", () => {
        visitorEventManager.unsubscribeFromUpdates(handleUpdate);
        clearInterval(keepAliveInterval);
        try {
          controller.close();
        } catch (error) {
          console.error("Error closing controller:", error);
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
