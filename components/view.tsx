import React from "react";
import Ping from "./ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeclient } from "@/sanity/lib/WriteClient";
import { unstable_after } from "next/server";
import { unstable_after as after } from "next/server";

const view = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  after(
    async () =>
      await writeclient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">
          {" "}
          {Number(totalViews) === 1
            ? `${totalViews} view`
            : `${totalViews} views`}
        </span>
      </p>
    </div>
  );
};

export default view;
