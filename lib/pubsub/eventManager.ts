import { EventEmitter } from "events";
import type { VisitorDataPoint } from "@/types";
import { EVENT_MANAGER_CONFIG } from "@/lib/constants";

class VisitorDataEventManager extends EventEmitter {
  private static instance: VisitorDataEventManager;

  private constructor() {
    super();
    this.setMaxListeners(EVENT_MANAGER_CONFIG.MAX_LISTENERS);
  }

  static getInstance(): VisitorDataEventManager {
    if (!VisitorDataEventManager.instance) {
      VisitorDataEventManager.instance = new VisitorDataEventManager();
    }
    return VisitorDataEventManager.instance;
  }

  publishUpdate(data: VisitorDataPoint[]) {
    this.emit(EVENT_MANAGER_CONFIG.EVENT_NAME, data);
  }

  subscribeToUpdates(callback: (data: VisitorDataPoint[]) => void) {
    this.on(EVENT_MANAGER_CONFIG.EVENT_NAME, callback);
  }

  unsubscribeFromUpdates(callback: (data: VisitorDataPoint[]) => void) {
    this.off(EVENT_MANAGER_CONFIG.EVENT_NAME, callback);
  }
}

export const visitorEventManager = VisitorDataEventManager.getInstance();
