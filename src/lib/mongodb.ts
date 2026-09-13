import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인)");
}

// 개발 모드의 HMR로 모듈이 재평가되어도 연결을 재사용하도록 global에 캐시
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise: Promise<MongoClient> =
  globalWithMongo._mongoClientPromise ??
  (globalWithMongo._mongoClientPromise = new MongoClient(uri).connect());

export default clientPromise;

export const DB_NAME = "linknamu";
export const CLICKS_COLLECTION = "clicks";

export type ClickDoc = {
  _id: string; // 링크 id (예: "github")
  count: number;
};
