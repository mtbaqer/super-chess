export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      cells: {
        Row: {
          room_id: number;
          index: number;
        };
        Insert: {
          room_id: number;
          index: number;
        };
        Update: {
          room_id?: number;
          index?: number;
        };
      };
      players: {
        Row: {
          id: number;
          created_at: string | null;
          room_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          room_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          room_id?: number | null;
        };
      };
      rooms: {
        Row: {
          id: number;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
