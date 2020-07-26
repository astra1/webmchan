import { ServerRequest } from "https://deno.land/std/http/server.ts";
import {
  FileTypeEnum,
  IFile,
  IRootObject,
} from "../src/app/core/models/models.ts";
import Schema, {
  string,
  number,
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

const harkachUrl = Deno.env.get("harkach_url")!;

const RequestParamsSchema = Schema({
  board_name: string.trim().normalize().between(1, 4),
  thread_num: number,
});

export default async (req: ServerRequest) => {
  try {
    const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const boardName = queryParams.get("board_name");
    const threadNum = queryParams.get("thread_num");

    if (!queryParams || !boardName) {
      return req.respond({
        status: 400,
        body: "Empty query params",
      });
    }

    const validator = RequestParamsSchema.destruct();
    const [error, validatedParams] = validator({
      board_name: boardName,
      thread_num: Number(threadNum),
    });

    if (error || !validatedParams) {
      return req.respond({
        status: 400,
        body: error ? error.message : "Cannot validate query params",
      });
    }

    const postList = await getPostList(
      validatedParams.board_name,
      validatedParams.thread_num
    );

    return req.respond({
      status: 200,
      body: JSON.stringify(postList),
    });
  } catch (error) {
    return req.respond({
      status: 403,
      body: error.message,
    });
  }
};

async function getPostList(boardName: string, threadNum: number) {
  const res = await fetch(`${harkachUrl}/${boardName}/res/${threadNum}.json`);
  const boardCatalog: IRootObject = await res.json();
  const threadPosts = [...boardCatalog.threads[0].posts]
    .filter((p) => p.files.length > 0)
    .map((p) => {
      const postFiles: IFile[] = [...p.files]
        .filter(
          (f) => f.type === FileTypeEnum.MP4 || f.type === FileTypeEnum.WEBM
        )
        .map((f) => {
          return {
            ...f,
            thumbnail: `${harkachUrl}/${f.thumbnail}`,
            path: `${harkachUrl}/${f.path}`,
          };
        });

      return {
        ...p,
        files: postFiles,
        files_count: postFiles.length,
      };
    })
    .filter((p) => p.files.length > 0);

  return threadPosts;
}
