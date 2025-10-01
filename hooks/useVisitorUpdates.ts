import { useEffect, useState } from "react";
import type { VisitorDataPoint } from "@/types";
import { API_ENDPOINTS, SSE_CONFIG } from "@/lib/constants";

interface SSEMessage {
  type: "connected" | "update";
  data?: VisitorDataPoint[];
}

export function useVisitorUpdates() {
  const [updates, setUpdates] = useState<VisitorDataPoint[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connect = () => {
      try {
        eventSource = new EventSource(API_ENDPOINTS.VISITORS_STREAM);

        eventSource.onopen = () => {
          setIsConnected(true);
          setError(null);
          console.log("SSE connection established");
        };

        eventSource.onmessage = (event) => {
          try {
            const message: SSEMessage = JSON.parse(event.data);

            if (message.type === "connected") {
              console.log("SSE connected");
            } else if (message.type === "update" && message.data) {
              console.log("Received visitor update:", message.data);
              setUpdates(message.data);
            }
          } catch (err) {
            console.error("Error parsing SSE message:", err);
          }
        };

        eventSource.onerror = (err) => {
          console.error("SSE error:", err);
          setIsConnected(false);
          setError("Connection lost. Reconnecting...");

          // Close and reconnect after configured interval
          eventSource?.close();
          setTimeout(connect, SSE_CONFIG.RECONNECT_INTERVAL);
        };
      } catch (err) {
        console.error("Error creating EventSource:", err);
        setError("Failed to establish connection");
      }
    };

    connect();

    // Cleanup on unmount
    return () => {
      if (eventSource) {
        eventSource.close();
        setIsConnected(false);
      }
    };
  }, []);

  return { updates, isConnected, error };
}
