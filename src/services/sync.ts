import type { UserState } from "../types";
import { isSupabaseConfigured } from "./supabaseClient";
import { syncWithSupabase } from "./cloudSync";
import { saveState } from "./storage";

export const markSyncAttempt = async (state: UserState): Promise<UserState> => {
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

  return syncWithSupabase(state);
};
