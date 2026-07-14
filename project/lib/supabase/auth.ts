import { supabase } from '@/lib/supabase/client';

export const signIn = async (email: string, password: string) => {
  if (!supabase) return { data: null, error: new Error('Supabase not initialized') };
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  if (!supabase) return { data: null, error: new Error('Supabase not initialized') };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabase) return { error: new Error('Supabase not initialized') };
  const { error } = await supabase.auth.signOut();
  return { error };
};
