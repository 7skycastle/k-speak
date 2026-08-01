import type { UserState } from "../types";
import { isSupabaseConfigured } from "./supabaseClient";
import { saveState } from "./storage";

export const markSyncAttempt = (state: UserState): UserState => {
  if (!isSupabaseConfigured()) {
    return saveState({
      ...state,
      sync: {
        mode: "local-only",
        pending: false,
        message: "새 Supabase 프로젝트 정보가 없어 로컬 저장만 사용 중입니다."
      }
    });
  }

  return saveState({
    ...state,
    sync: {
      mode: "supabase-ready",
      pending: true,
      lastSyncedAt: new Date().toISOString(),
      message: "Supabase 연결 정보가 준비되었습니다. 테이블 생성 후 업로드 함수를 연결하세요."
    }
  });
};
