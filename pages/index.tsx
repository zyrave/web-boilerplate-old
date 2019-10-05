import React from "react";
import { NextPage } from "next";

import { useMeQuery } from "../generated/graphql";

interface Props {}

const Index: NextPage<Props> = () => {
  const { loading, data } = useMeQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return <div>{data.me!.email}</div>;
};

export default Index;
