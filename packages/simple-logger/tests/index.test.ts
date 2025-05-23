import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { LogManagerImpl } from "@/index";

describe("LogManager", () => {
  let logManager: LogManagerImpl;
  let consoleMock: { log: any; warn: any; error: any };

  beforeEach(() => {
    // Reset singleton
    (LogManagerImpl as any).instance = undefined;
    logManager = LogManagerImpl.getInstance();

    // Mock console methods
    consoleMock = {
      log: vi.spyOn(console, "log").mockImplementation(() => {}),
      warn: vi.spyOn(console, "warn").mockImplementation(() => {}),
      error: vi.spyOn(console, "error").mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Singleton", () => {
    it("should create only one instance", () => {
      const instance1 = LogManagerImpl.getInstance();
      const instance2 = LogManagerImpl.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("Logger Creation", () => {
    it("should create new logger with namespace", () => {
      const logger = logManager.getLogger("test");
      logger.info("test message");
      expect(consoleMock.log).toHaveBeenCalledWith(
        "[INFO] [test]",
        "test message"
      );
    });

    it("should return same logger instance for same namespace", () => {
      const logger1 = logManager.getLogger("test");
      const logger2 = logManager.getLogger("test");
      expect(logger1).toBe(logger2);
    });
  });

  describe("Log Levels", () => {
    it("should respect log level hierarchy", () => {
      const logger = logManager.getLogger("test");

      // Override the default '*' pattern with a more restrictive level
      logManager.setLogLevel("*", "error");
      logManager.setLogLevel("test", "warn");

      logger.trace("trace");
      logger.info("info");
      logger.warn("warn");
      logger.error("error");

      expect(consoleMock.log).not.toHaveBeenCalled(); // trace and info
      expect(consoleMock.warn).toHaveBeenCalledWith("[WARN] [test]", "warn");
      expect(consoleMock.error).toHaveBeenCalledWith("[ERROR] [test]", "error");
    });

    it("should handle different log levels for different namespaces", () => {
      const logger1 = logManager.getLogger("app:component1");
      const logger2 = logManager.getLogger("app:component2");

      // Clear default pattern and set specific levels
      logManager.setLogLevel("*", "error");
      logManager.setLogLevel("app:component1", "trace");
      logManager.setLogLevel("app:component2", "error");

      logger1.trace("trace1");
      logger2.trace("trace2");

      expect(consoleMock.log).toHaveBeenCalledWith(
        "[TRACE] [app:component1]",
        "trace1"
      );
      expect(consoleMock.log).not.toHaveBeenCalledWith(
        "[TRACE] [app:component2]",
        "trace2"
      );
    });

    it("should support wildcard patterns", () => {
      const logger = logManager.getLogger("app:test");

      // Clear default pattern and set specific level
      logManager.setLogLevel("*", "error");
      logManager.setLogLevel("app:*", "info");

      logger.trace("trace");
      logger.info("info");

      expect(consoleMock.log).not.toHaveBeenCalledWith(
        "[TRACE] [app:test]",
        "trace"
      );
      expect(consoleMock.log).toHaveBeenCalledWith("[INFO] [app:test]", "info");
    });

    it("should support regex patterns", () => {
      const logger = logManager.getLogger("test:123");

      // Clear default pattern and set specific level
      logManager.setLogLevel("*", "error");
      logManager.setLogLevel(/test:\d+/, "info");

      logger.trace("trace");
      logger.info("info");

      expect(consoleMock.log).not.toHaveBeenCalledWith(
        "[TRACE] [test:123]",
        "trace"
      );
      expect(consoleMock.log).toHaveBeenCalledWith("[INFO] [test:123]", "info");
    });
  });

  describe("Enable/Disable", () => {
    it("should not log when disabled", () => {
      const logger = logManager.getLogger("test");

      logManager.disable();
      logger.info("test");

      expect(consoleMock.log).not.toHaveBeenCalled();
    });

    it("should resume logging when re-enabled", () => {
      const logger = logManager.getLogger("test");

      logManager.disable();
      logger.info("test1");

      logManager.enable();
      logger.info("test2");

      expect(consoleMock.log).not.toHaveBeenCalledWith(
        "[INFO] [test]",
        "test1"
      );
      expect(consoleMock.log).toHaveBeenCalledWith("[INFO] [test]", "test2");
    });
  });

  describe("Object Logging", () => {
    it("should stringify objects", () => {
      const logger = logManager.getLogger("test");
      const testObj = { foo: "bar" };

      logger.info("test", testObj);

      expect(consoleMock.log).toHaveBeenCalledWith(
        "[INFO] [test]",
        "test",
        JSON.stringify(testObj, null, 2)
      );
    });
  });
});
