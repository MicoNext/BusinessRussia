export function setupGlobalErrorHandlers() {
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", { promise, reason })
  })
  process.on("uncaughtException", error => {
    console.error("Uncaught Exception thrown:", error)
  })
  process.on("SIGTERM", gracefulShutdown)
  process.on("SIGINT", gracefulShutdown)
}

async function gracefulShutdown() {
  console.info("Starting graceful shutdown...")
  process.exit(0)
}
