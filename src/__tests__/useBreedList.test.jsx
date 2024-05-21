import { renderHook, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import useBreedList from "../useBreedList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

/**
 * Here's how you have to mock component prio
 * @example
 * function getBreedList(animal) {
 *    let list;
 *
 *  function TestComponent() {
 *    list = useBreedList(animal);
 *    return null;
 *  }
 *
 *  render(
 *    <QueryClientProvider client={queryclient}>
 *      <TestComponent />
 *    </QueryClientProvider>
 *  );
 *  return list;
 * }
 * test("gives an empty list with no animal provided", async () => {
 *   const [breedList, status] = getBreedList();
 *   expect(breedList).toHaveLength(0);
 *   expect(status).toBe("loading");
 * });
 */
test("gives an empty list with no animal provided", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedLists, status] = result.current;
  expect(breedLists).toHaveLength(0);
  expect(status).toBe("loading");
});

test("gives back breeds when given an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];
  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => expect(result.current[1]).toBe("success"));

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
