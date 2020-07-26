import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { IBoardRoot } from "../src/app/core/models/models.ts";

const harkachUrl = Deno.env.get("harkach_url")!;

export default async (req: ServerRequest) => {
  try {
    const boardList = await getBoardList();
    req.respond({
      body: JSON.stringify(boardList),
    });
  } catch (error) {
    req.respond({
      status: 404,
      body: error.message,
    });
  }
};

async function getBoardList() {
  const res = await fetch(`${harkachUrl}/boards.json`);
  const boardCatalog: IBoardRoot = await res.json();
  return boardCatalog.boards;
}
