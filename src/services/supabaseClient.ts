export interface SupabaseConnectionConfig {
  url?: string;
  anonKey?: string;
  redirectUrl?: string;
}

export const getSupabaseConfig = (): SupabaseConnectionConfig => ({
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  redirectUrl: import.meta.env.VITE_SUPABASE_REDIRECT_URL
});

export const isSupabaseConfigured = () => {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
};

export const describeSupabaseStatus = () =>
  isSupabaseConfigured()
    ? "새 Supabase 환경 변수가 감지되었습니다. 인증과 동기화 구현을 연결할 수 있습니다."
    : "새 Supabase URL과 anon key가 아직 없어 로컬 저장과 연결 준비 코드만 활성화되어 있습니다.";
