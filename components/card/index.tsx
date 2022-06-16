import { FingerPrintIcon, PuzzleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface ICardProps {
  id: number;
  name: string;
  img: string;
  gender: string;
  species: string;
  imgX?: number;
  imgY?: number;
}
function Card({
  name,
  id,
  img,
  gender,
  species,
  imgX = 200,
  imgY = 200,
}: ICardProps) {
  return (
    <Link href={"/" + id} passHref>
      <div
        className={`p-4 bg-white rounded-md bg-opacity-5 transition-all  hover:bg-opacity-10 hover:cursor-pointer  gap-2 flex flex-col card`}
      >
        <Image
          width={imgX}
          height={imgY}
          className="rounded-md"
          src={img}
          alt={name}
        ></Image>
        <p className=" font-bold">{name}</p>
        <div className=" flex gap-2">
          <FingerPrintIcon className="w-4 opacity-30 items-center" />
          <p className=" opacity-30">{gender}</p>
        </div>
        <div className=" flex gap-2">
          <PuzzleIcon className="w-4 opacity-30 items-center" />
          <p className=" opacity-30">{species}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
