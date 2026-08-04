import type { UserState } from "../types";
import { isSupabaseConfigured } from "./supabaseClient";
import { syncWithSupabase } from "./cloudSync";
import { saveState } from "./storage";

export const markSyncAttempt = async (state: UserState): Promise<UserState> => {
  if (!isSupabaseConfigured()) {
    return saveState({
      ...state,
      sync: {
        ...state.sync,
        mode: "local-only",
        pending: false,
        messageKey: "sync.localOnly",
        message: "Supabase project settings are missing, so only local storage is available."
      }
    });
  }

  return syncWithSupabase(state);
};
