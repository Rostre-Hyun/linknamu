import { MongoClient } from "mongodb";

// 개발 모드의 HMR로 모듈이 재평가되어도 연결을 재사용하도록 global에 캐시
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 환경 변수 검사는 실제 연결 시점에 수행한다.
// 모듈 로드 시점에 throw하면 MONGODB_URI가 없는 환경(예: Vercel 빌드)에서
// 빌드 전체가 실패하므로, 요청 처리 중에만 에러가 나도록 한다.
export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 또는 Vercel Environment Variables 확인)",
    );
  }

  globalWithMongo._mongoClientPromise ??= new MongoClient(uri).connect();
  return globalWithMongo._mongoClientPromise;
}

export const DB_NAME = "linknamu";
export const CLICKS_COLLECTION = "clicks";

export type ClickDoc = {
  _id: string; // 링크 id (예: "github")
  count: number;
};
