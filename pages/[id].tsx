import { gql, useQuery } from "@apollo/client";
import { ArrowLeftIcon, GlobeIcon, HeartIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Card from "../components/card";
import { query } from "../graphql/characters";
import { IEpisode } from "../models/characters";
function Character() {
  const { id } = useRouter().query;
  const { data, loading } = useQuery(
    gql(`
    query GetCharacter ($id: ID!) {
      character(id: $id) {
        id
        name
        gender
        status
        species
        origin{
          name
          dimension
        }
        image
        episode{
          name
          air_date
        }
      }
    }
    
  `),
    {
      variables: {
        id: id,
      },
    }
  );
  return (
    <div className="mt-20 max-w-6xl w-full text-white m-auto gap-4 p-4">
      <Link href={"/"}>
        <button className="p-2 mb-10 bg-white rounded-md bg-opacity-10 hover:bg-opacity-20 transition-all flex gap-2 items-center mb-4">
          <ArrowLeftIcon className="w-6" /> {"Go Back to the main page"}
        </button>
      </Link>

      {loading ? (
        "Loading ..."
      ) : (
        <>
          <h1 className=" opacity-70 text-3xl">
            Welcome to{" "}
            <span className=" text-pink-500">{data.character.name}</span> page
            XD
          </h1>
          <div className=" grid grid-cols-4 gap-6 mt-10">
            <Card
              name={data.character.name}
              img={data.character.image}
              id={data.character.id}
              gender={data.character.gender}
              species={data.character.species}
              imgX={100}
              imgY={200}
            ></Card>
            <div className=" col-span-3 p-4 bg-white rounded-md bg-opacity-5 transition-all  hover:bg-opacity-10 hover:cursor-pointer grayscale hover:grayscale-0 gap-2 flex flex-col">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 ">
                  <GlobeIcon className=" w-6 opacity-40 text-center " />
                  <p>{data.character.origin.name}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <HeartIcon
                    className={`w-6 opacity-40 text-center  ${
                      data.character.status === "Alive"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  />
                  <p>{data.character.status}</p>
                </div>
              </div>
              <div className=" mt-20 ">
                <h1 className="mb-10 text-xl font-medium">Episodes:</h1>
                <div className="w-full overflow-x-auto flex gap-5">
                  {data.character.episode.map((ep: IEpisode) => {
                    return (
                      <div
                        className={`p-4 mb-10 bg-white min-w-max rounded-md bg-opacity-5 transition-all  hover:bg-opacity-10 hover:cursor-pointer  gap-2 flex flex-col`}
                      >
                        <p className=" font-bold">{ep.name}</p>
                        <div className=" flex gap-2">
                          <p className=" opacity-30">{ep.air_date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Character;
