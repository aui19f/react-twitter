import GlobalStyles from "@/assets/createGlobalStyle";
import router from "@/Router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Reset } from "styled-reset";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Reset /> */}
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>
);

/**
 * import 자동완성이 계속 상대경로일 경우
 * 1. 환경설정
 * 2. (검색) TypeScript › Preferences: Import Module Specifier
 *    Preferred path style for auto imports.
 * 3. non-relative
 * 변경하기
 */
