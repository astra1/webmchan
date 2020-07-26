import { ServerRequest } from "https://deno.land/std/http/server.ts";

export default async (req: ServerRequest) => {
  return req.respond({
    status: 200,
    body: `🦕 ${Deno.version.deno}`,
  });
};
