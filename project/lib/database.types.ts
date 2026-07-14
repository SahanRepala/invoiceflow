export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          company: string
          email: string
          phone: string | null
          address: string | null
          notes: string | null
          avatar_color: string | null
          initials: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          company: string
          email: string
          phone?: string | null
          address?: string | null
          notes?: string | null
          avatar_color?: string | null
          initials?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          company?: string
          email?: string
          phone?: string | null
          address?: string | null
          notes?: string | null
          avatar_color?: string | null
          initials?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          client_id: string
          number: string
          amount: number
          due_date: string
          issue_date: string
          status: 'paid' | 'pending' | 'overdue' | 'partial' | 'draft'
          tax_rate: number
          discount: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id: string
          number: string
          amount: number
          due_date: string
          issue_date: string
          status?: 'paid' | 'pending' | 'overdue' | 'partial' | 'draft'
          tax_rate?: number
          discount?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string
          number?: string
          amount?: number
          due_date?: string
          issue_date?: string
          status?: 'paid' | 'pending' | 'overdue' | 'partial' | 'draft'
          tax_rate?: number
          discount?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string
          description: string
          quantity: number
          rate: number
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          description: string
          quantity?: number
          rate: number
          created_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          description?: string
          quantity?: number
          rate?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          created_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          user_id: string
          invoice_id: string
          type: 'pre-due' | 'due' | 'post-due' | 'final-notice'
          tone: 'friendly' | 'professional' | 'firm' | 'legal'
          status: 'scheduled' | 'sent' | 'failed' | 'upcoming'
          scheduled_date: string
          sent_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          invoice_id: string
          type: 'pre-due' | 'due' | 'post-due' | 'final-notice'
          tone: 'friendly' | 'professional' | 'firm' | 'legal'
          status?: 'scheduled' | 'sent' | 'failed' | 'upcoming'
          scheduled_date: string
          sent_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          invoice_id?: string
          type?: 'pre-due' | 'due' | 'post-due' | 'final-notice'
          tone?: 'friendly' | 'professional' | 'firm' | 'legal'
          status?: 'scheduled' | 'sent' | 'failed' | 'upcoming'
          scheduled_date?: string
          sent_date?: string | null
          created_at?: string
        }
      }
    }
  }
}
