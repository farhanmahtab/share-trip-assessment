# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

- **Modular Page-Level Orchestration**: Moved state management and fetching logic into a dedicated `ProductPage` component. This separates high-level concerns from the `App.tsx` entry point and individual UI components.
- **Custom Hook Pattern**: Leveraged a `useProducts` hook to encapsulate API calls, local state, and resilience logic, keeping building components simple and maintainable.
- **In-Memory LRU Cache**: Implemented a custom `ProductCache` service with an LRU (Least Recently Used) eviction policy and a 5-minute TTL. This provides instant navigation for cached results while preventing memory growth.
- **Resilient Fetching (Retry Strategy)**: Automatic 3-attempt retry mechanism with linear backoff (1s, 2s) to handle the simulated 20% API failure rate.
- **Debounced Search**: Integrated a `useDebounce` hook (200ms delay) to optimize API usage and UI responsiveness during typing.
- **Race Condition Prevention**: Fully integrated `AbortController` in the data-fetching layer to cancel stale requests and pending retries when navigation or filters change.
- **Loading UI (Skeletons)**: Used `ProductSkeleton` cards with shimmer animations for better perceived performance.
- **Theme Adaptation**: Standardized colors using system variables (`text-[#0f172a]`) to ensure full visibility on the light-themed glassmorphism interface.

## 2. Trade-offs and Omissions
*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

- **React Query/SWR**: Opted for a custom hook and manual caching logic to demonstrate deep React/TS knowledge without adding external orchestration libraries.
- **Infinite Scroll**: Chose pagination as per initial requirements, but infinite scroll would be a great alternative for a modern e-commerce experience.
- **Accessibility (Aria-Live)**: Basic accessibility implemented, but `aria-live` regions for error notifications would be a priority with more time.

## 3. AI Usage
*How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

- **Design Extraction**: Used AI to parse Figma screenshots and technical specs for pixel-perfect implementation of the product cards.
- **Refactoring Strategy**: Used AI to help plan the decomposition of a monolithic `App.tsx` into specialized, modular sub-components.
- **Documentation**: Assisted in generating concise analysis and walkthrough artifacts.

## 4. Edge Cases Identified
*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

- **Mobile Pagination Overflow**: The pagination bar might require a scrollable wrapper or "ellipsis" logic for devices with very small screens when many pages are present.
