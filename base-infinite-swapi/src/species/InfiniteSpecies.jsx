import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // 29. Code Quiz! Infinite Species
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["sw-species"],
      queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined; // fourni par swapi
      },
    });

  // Gestion des états/erreurs
  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">{error.toString()}</div>;

  // Render
  return (
    <>
      {isFetching && <div className="loading">Fetching...</div>}
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {data &&
          data.pages.map((pageData) => {
            return pageData.results.map((specie) => {
              return (
                <Species
                  key={specie.name + specie.average_height}
                  name={specie.name}
                  language={specie.language}
                  averageLifespan={specie.average_lifespan}
                />
              );
            });
          })}
      </InfiniteScroll>
    </>
  );
}
