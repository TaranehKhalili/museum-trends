export const API_ENDPOINTS = {
  VISITORS: "/api/visitors",
  VISITORS_STREAM: "/api/visitors/stream",
} as const;

export const SSE_CONFIG = {
  RECONNECT_INTERVAL: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,
  KEEP_ALIVE_INTERVAL: 30000,
  CONNECTION_TIMEOUT: 10000,
} as const;

export const CHART_CONFIG = {
  HEIGHT: 700,
  ZOOM_TYPE: "x" as const,
  ANIMATION_DURATION: 1000,
  MARKER_RADIUS: 3,
  LINE_WIDTH: 2,
  LEGEND_FONT_SIZE: "12px",
  TOOLTIP_BORDER_RADIUS: 8,
  TOOLTIP_SHADOW: true,
} as const;

export const EVENT_MANAGER_CONFIG = {
  MAX_LISTENERS: 50,
  EVENT_NAME: "visitor-update",
} as const;

export const DATA_CONFIG = {
  CSV_FILE_PATH: "data/museum_visitors.csv",
  DATE_FORMAT: "YYYY-MM-DD",
  DECIMAL_PLACES: 0,
} as const;

export const UI_CONFIG = {
  CONNECTION_STATUS_SIZE: 4,
  PULSE_ANIMATION_DURATION: 1000,
  ERROR_DISPLAY_DURATION: 5000,
} as const;
