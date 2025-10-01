import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { VisitorDataPoint } from "@/types";
import { visitorEventManager } from "@/lib/pubsub/eventManager";

export async function POST(request: NextRequest) {
  try {
    const data: VisitorDataPoint[] = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Data must be an array" },
        { status: 400 }
      );
    }

    for (const point of data) {
      if (!point.date || !point.museum || typeof point.value !== "number") {
        return NextResponse.json(
          {
            error:
              "Each item must have date (string), museum (string), and value (number)",
          },
          { status: 400 }
        );
      }
    }

    visitorEventManager.publishUpdate(data);

    return NextResponse.json(
      {
        success: true,
        message: `Published ${data.length} data points`,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing visitor data:", error);
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
