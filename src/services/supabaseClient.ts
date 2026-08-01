import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseConnectionConfig {
  url?: string;
  anonKey?: string;
  redirectUrl?: string;
}

let client: SupabaseClient | undefined;

export const getSupabaseConfig = (): SupabaseConnectionConfig => ({
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  redirectUrl: import.meta.env.VITE_SUPABASE_REDIRECT_URL
});

export const isSupabaseConfigured = () => {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
};

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
  }

  client ??= createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  return client;
};

export const describeSupabaseStatus = () =>
  isSupabaseConfigured()
    ? "새 Supabase 환경 변수가 감지되었습니다. 이메일 링크 인증과 클라우드 동기화를 사용할 수 있습니다."
    : "새 Supabase URL과 anon key가 아직 없어 로컬 저장과 연결 준비 코드만 활성화되어 있습니다.";
