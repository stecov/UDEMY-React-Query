import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // 25. Write useInfiniteQuery Call
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["sw-people"],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined; // fourni par swpai
      },
    });

  // 28. useInfiniteQuery Fetching and Error states
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div className="error">{error.toString()}</div>;
  }
  return (
    // 26. InfiniteScroll Component
    <>
      {isFetching && <div className="loading">Fetching...</div>}
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        {data &&
          data.pages.map((pageData) => {
            return pageData.results.map((person) => {
              return (
                <Person
                  key={person.name + person.height}
                  name={person.name}
                  hairColor={person.hair_color}
                  eyeColor={person.eye_color}
                />
              );
            });
          })}
      </InfiniteScroll>
    </>
  );
}
