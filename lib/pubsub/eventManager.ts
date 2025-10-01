import { EventEmitter } from "events";
import type { VisitorDataPoint } from "@/types";

class VisitorDataEventManager extends EventEmitter {
  private static instance: VisitorDataEventManager;

  private constructor() {
    super();
    this.setMaxListeners(10);
  }

  static getInstance(): VisitorDataEventManager {
    if (!VisitorDataEventManager.instance) {
      VisitorDataEventManager.instance = new VisitorDataEventManager();
    }
    return VisitorDataEventManager.instance;
  }

  publishUpdate(data: VisitorDataPoint[]) {
    this.emit("visitor-update", data);
  }

  subscribeToUpdates(callback: (data: VisitorDataPoint[]) => void) {
    this.on("visitor-update", callback);
  }

  unsubscribeFromUpdates(callback: (data: VisitorDataPoint[]) => void) {
    this.off("visitor-update", callback);
  }
}

export const visitorEventManager = VisitorDataEventManager.getInstance();
