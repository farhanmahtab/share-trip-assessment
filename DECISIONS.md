# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

- **Custom Hook Pattern**: I implemented a robust `useProducts` hook to decouple data fetching logic from the UI. This centralization makes it easier to manage the "resilience" requirements.
- **Resilient Fetching (Retry Strategy)**: The hook includes an automatic retry mechanism for failed API calls. It attempts to fetch up to 3 times (initial + 2 retries) with a linear backoff (1s then 2s) to bridge short network fluctuations.
- **Loading UI (Skeletons)**: Instead of a simple spinner, I used `ProductSkeleton` cards with a shimmer effect (via `framer-motion`) to provide immediate, context-aware visual feedback.
- **Theme & Visibility Adaptation**: Adapted the modular components to use high-contrast dark text (`text-[#0f172a]`) on light surfaces, ensuring full visibility of search and filtering controls.
- **Debounced Search**: Integrated a `useDebounce` hook to delay API calls during typing (500ms), reducing server pressure and improving UI responsiveness.
- **Race Condition Prevention**: Implemented `AbortController` in the data-fetching layer to cancel stale requests and pending retries when new filters or pages are triggered.
- **Global & Inline Error States**: If all retries fail, a prominent error card appears with a "Try Again" button.

## 2. Trade-offs and Omissions
*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

- **React Query/SWR**: I opted for a custom hook instead of adding a heavy-duty library like TanStack Query. While Query would provide better caching and out-of-the-box retries, a custom hook demonstrated the manual handling of the logic.
- **Accessibility (Aria-Live)**: I implemented basic accessibility (aria-labels for buttons), but could add `aria-live` regions for error notifications and loading status changes.

## 3. AI Usage
*How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

- **Research and Decision validation**: I used AI to research and validate my decisions on how to handle the flaky API requests, loading states, and error handling.
- **Boilerplate Integration**: Used the AI's ability to quickly parse the existing boilerplate structure and style it using the predefined "glass-panel" classes for consistency.

## 4. Edge Cases Identified
*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

- **Mobile Pagination**: The pagination component might overflow on very small devices if many pages exist (it currently limits to 5 visible page numbers).
