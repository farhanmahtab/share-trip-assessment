import type { Product, PaginatedResponse, FetchProductsParams } from '../types/product';

interface CacheEntry {
  response: PaginatedResponse<Product>;
  timestamp: number;
}

class ProductCache {
  private cache: Map<string, CacheEntry>;
  private maxItems: number;
  private ttl: number;

  constructor(maxItems = 50, ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxItems = maxItems;
    this.ttl = ttl;
  }

  /**
   * Generates a stable cache key from fetch parameters.
   * Excludes the AbortSignal to avoid unnecessary cache busts.
   */
  public generateKey(params: FetchProductsParams): string {
    const { signal, ...cacheableParams } = params;
    return JSON.stringify(cacheableParams);
  }

  /**
   * Retrieves an item from the cache if it exists and is not expired.
   * Implements LRU by re-inserting the accessed key.
   */
  public get(key: string): PaginatedResponse<Product> | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check for expiration
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (LRU behavior: mark as recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.response;
  }

  /**
   * Stores an item in the cache.
   * Evicts the oldest item if the cache exceeds its limit.
   */
  public set(key: string, response: PaginatedResponse<Product>): void {
    // If cache is full, delete the first (oldest) entry
    if (this.cache.size >= this.maxItems) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      response,
      timestamp: Date.now(),
    });
  }

  public clear(): void {
    this.cache.clear();
  }
}

// Export a singleton instance
export const productCache = new ProductCache();
