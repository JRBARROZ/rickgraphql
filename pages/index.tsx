import type { GetServerSideProps, NextPage } from "next";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  HeartIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import client from "../apollo-client";
import { gql, useLazyQuery } from "@apollo/client";
import { query } from "../graphql/characters";
import ICharacter, { IResults } from "../models/characters";
import React from "react";
import Card from "../components/card";
interface IHomeProps {
  charactersData: ICharacter;
}
const Home = ({ charactersData }: IHomeProps) => {
  const [name, setName] = React.useState<string | undefined>();
  const [page, setPage] = React.useState<number>(1);
  const searchRef = React.useRef<any>();
  const [totalPages, setTotalPages] = React.useState<number>(
    charactersData.characters?.info.pages
  );
  const [characters, setCharacters] = React.useState<IResults[]>(
    charactersData.characters.results
  );
  const [getCharacters, { loading, error, data }] = useLazyQuery<ICharacter>(
    gql(query)
  );
  function handleNameSearch() {
    setTotalPages(data?.characters?.info.pages || 1);
    getCharacters({
      variables: {
        page: page,
        filter: name,
      },
    });
  }
  searchRef.current = handleNameSearch;
  React.useEffect(() => {
    setPage(1);
    const timeout = setTimeout(() => {
      if (typeof name === "string") {
        searchRef.current();
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [name]);
  React.useEffect(() => {
    if (data?.characters?.results && data.characters?.results.length) {
      setTotalPages(data.characters?.info.pages);
      setCharacters(data.characters?.results);
    }
  }, [data?.characters]);
  return (
    <>
      <Head>
        <title>Wubba Lubba Dub Dub | Welcome</title>
      </Head>
      <div className="p-2 flex gap-3 bg-black shadow-2xl backdrop-blur-lg items-center text-white bg-opacity-70 z-50 fixed bottom-4 rounded-md left-1/2 transform -translate-x-1/2  text-center">
        <p className=" font-medium opacity-60">
          Page {page} off {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="w-6 opacity-40 hover:cursor-pointer hover:opacity-70 transition-all disabled:opacity-10"
            disabled={page === 1 ? true : false}
            onClick={() => {
              setPage((page) => page - 1);
              getCharacters({
                variables: {
                  page: page - 1,
                  filter: name,
                },
              });
            }}
          >
            <ArrowCircleLeftIcon />
          </button>
          <button
            className="w-6 opacity-40 hover:cursor-pointer  hover:opacity-70 transition-all disabled:opacity-10"
            onClick={() => {
              setPage((page) => page + 1);
              getCharacters({
                variables: {
                  page: page + 1,
                  filter: name,
                },
              });
            }}
            disabled={page === totalPages ? true : false}
          >
            <ArrowCircleRightIcon />
          </button>
        </div>
      </div>
      <div className="">
        <div className="bg-gradient-to-r from-pink-500 to-blue-400  bg-opacity-5 p-4 w-full text-white flex justify-center flex-col items-center gap-2">
          <h1 className="text-xl mt-8">Welcome to Rickgraphql</h1>
          <div className=" flex gap-2 items-center flex-wrap text-center justify-center">
            <p className=" opacity-50">
              Wubba Lubba Dub Dub, this entire app is built with NextJs,
              Tailwindcss, Graphql and ApolloClient by Jrbarroz
            </p>
            <HeartIcon className="w-4 opacity-50" />
          </div>
          <div className="mt-1 max-w-2xl w-full flex text-white rounded-md bg-black items-center border-2 border-transparent transition-all hover:border-white hover:border-opacity-30 shadow-xl">
            <input
              className="w-full outline-none px-4 py-2 rounded-l-md bg-transparent"
              name="name"
              value={name}
              placeholder="Search for character name..."
              onChange={({ target }) => setName(target.value)}
            ></input>
            <div className="p-2">
              <SearchIcon className=" w-8 h-8 opacity-50" />
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-6xl w-full text-white m-auto p-4 grid lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-2 gap-4">
          {error && ""}
          {loading
            ? "Loading..."
            : error
            ? "Not Found :/"
            : characters.map(({ name, id, gender, image, species }) => (
                <Card
                  id={id}
                  key={id}
                  name={name}
                  gender={gender}
                  img={image}
                  species={species}
                />
              ))}
        </div>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<ICharacter>({
    query: gql(query),
    variables: {
      page: 1,
      filter: "",
    },
  });
  return {
    props: {
      charactersData: data,
    },
  };
};
export default Home;
