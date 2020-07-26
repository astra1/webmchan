import { ServerRequest } from "https://deno.land/std@0.61.0/http/server.ts";
import { IRootObject } from "../src/app/core/models/models.ts";
import Schema, {
  string,
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

const harkachUrl = Deno.env.get("harkach_url")!;

const RequestParamsSchema = Schema({
  board_name: string.trim().normalize().between(1, 4),
});

export default async (req: ServerRequest) => {
  try {
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const boardName = queryParams.get("board_name");

    if (!queryParams || !boardName) {
      req.respond({
        status: 400,
        body: "Empty query params",
      });
      return;
    }

    const validator = RequestParamsSchema.destruct();
    const [error, validatedParams] = validator({
      board_name: boardName,
    });

    if (error || !validatedParams) {
      return req.respond({
        status: 400,
        body: error ? error.message : "Cannot validate query params",
      });
    }

    const threadList = await getThreadList(validatedParams.board_name);

    req.respond({
      status: 200,
      body: JSON.stringify(threadList),
    });
  } catch (error) {
    req.respond({
      status: 404,
      body: error.message,
    });
  }
};

async function getThreadList(boardName: string) {
  const res = await fetch(`${harkachUrl}/${boardName}/catalog.json`);
  const boardCatalog: IRootObject = await res.json();
  const threads = boardCatalog.threads
    .filter((t) => t.files_count > 0)
    .sort((a, b) => (a.files_count > b.files_count ? -1 : 1));

  const fullUrlThreads = [...threads].map((t) => {
    if (t.files_count <= 0) {
      return t;
    }

    const updatedFiles = [...t.files].map((f) => ({
      ...f,
      thumbnail: `${harkachUrl}/${f.thumbnail}`,
    }));

    return {
      ...t,
      files: updatedFiles,
    };
  });
  return fullUrlThreads;
}
