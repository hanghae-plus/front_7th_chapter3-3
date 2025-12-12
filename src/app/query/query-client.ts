import { QueryClient } from "@tanstack/react-query";
import { DEFAULT_QUERY_OPTIONS } from "../../shared/config/query-config";

export const globalQueryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTIONS,
  },
});
