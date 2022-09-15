import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import people from "./mockUserData";
import IPerson from "@/schemas/person";
import Button from "./button";
import Person from "./person";
import client from "@/lib/apolloClient";
import { recommendedProfiles } from "@/graphql/recommendedProfiles";
import { useQuery, gql } from "@apollo/client";

const Panel = () => {
  const { loading, error, data } = useQuery(recommendedProfiles);

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[30.5rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold opacity-50">Suggestted Uers For You</h1>
        <Button blacked>See All</Button>
      </div>

      <div className="space-y-4">
        {data.recommendedProfiles.map((person: IPerson, index: number) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

export default Panel;
