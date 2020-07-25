import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda/mod.ts";
import { IBoardRoot } from "../src/app/core/models/models.ts";

const harkach_url = Deno.env.get("harkach_url")!; // ?? "";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    const boardList = await getBoardList();
    return {
      statusCode: 200,
      body: JSON.stringify(boardList),
    };
  } catch (error) {
    return {
      statusCode: 501,
      body: error.message,
    };
  }
}

async function getBoardList() {
  const res = await fetch(harkach_url);
  const boardCatalog: IBoardRoot = await res.json();
  return boardCatalog.boards;
}
