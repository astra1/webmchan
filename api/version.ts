import { ServerRequest } from "https://deno.land/std@0.61.0/http/server.ts";

export default async (req: ServerRequest) => {
  return req.respond({
    status: 200,
    body: `🦕 ${Deno.version.deno}`,
  });
};
