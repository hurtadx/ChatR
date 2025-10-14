import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  get client() {
    return this.supabase;
  }

 
  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password
    });
  }

 
  async signOut() {
    return await this.supabase.auth.signOut();
  }


  async getMessages() {
    return await this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
  }


  async sendMessage(message: string, userId: string) {
    return await this.supabase
      .from('messages')
      .insert([
        {
          content: message,
          user_id: userId,
          created_at: new Date()
        }
      ]);
  }

 
  subscribeToMessages(callback: (message: any) => void) {
    return this.supabase
      .channel('messages')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => callback(payload.new)
      )
      .subscribe();
  }
}
