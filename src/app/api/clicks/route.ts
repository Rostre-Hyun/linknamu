import { NextResponse } from "next/server";
import clientPromise, {
  CLICKS_COLLECTION,
  DB_NAME,
  type ClickDoc,
} from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 모든 링크의 클릭 수를 { [id]: count } 형태로 반환
export async function GET() {
  try {
    const client = await clientPromise;
    const docs = await client
      .db(DB_NAME)
      .collection<ClickDoc>(CLICKS_COLLECTION)
      .find()
      .toArray();

    const counts = Object.fromEntries(docs.map((d) => [d._id, d.count]));
    return NextResponse.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다" }, { status: 500 });
  }
}

// 특정 링크의 클릭 수를 1 증가시키고 새 값을 반환
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다" }, { status: 400 });
  }

  if (typeof id !== "string" || !/^[a-z0-9-]{1,50}$/.test(id)) {
    return NextResponse.json({ error: "유효하지 않은 링크 id입니다" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection<ClickDoc>(CLICKS_COLLECTION)
      .findOneAndUpdate(
        { _id: id },
        { $inc: { count: 1 } },
        { upsert: true, returnDocument: "after" },
      );

    return NextResponse.json({ id, count: result?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 증가 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다" }, { status: 500 });
  }
}
