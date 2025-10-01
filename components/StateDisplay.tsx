interface StateDisplayProps {
  title: string;
  message?: string;
  type?: "loading" | "error" | "empty";
}

export default function StateDisplay({
  title,
  message,
  type = "loading",
}: StateDisplayProps) {
  const getStyles = () => {
    switch (type) {
      case "loading":
        return {
          container: "bg-blue-50 border-2 border-blue-100",
          text: "text-gray-900",
          subtext: "text-gray-600",
        };
      case "error":
        return {
          container: "bg-red-50 border-2 border-red-100",
          text: "text-gray-900",
          subtext: "text-gray-600",
        };
      case "empty":
        return {
          container: "bg-gray-50 border-2 border-gray-100",
          text: "text-gray-800",
          subtext: "text-gray-500",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-6 ${styles.container}`}
      >
        {type === "loading" ? (
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
          </div>
        ) : type === "error" ? (
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        ) : (
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>

      <div className="text-center max-w-md">
        <h3 className={`text-xl font-semibold mb-2 ${styles.text}`}>{title}</h3>
        {message && (
          <p className={`text-sm leading-relaxed ${styles.subtext}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
