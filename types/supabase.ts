export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cells: {
        Row: {
          room_id: number
          row: number
          column: number
          type: string | null
        }
        Insert: {
          room_id: number
          row: number
          column: number
          type?: string | null
        }
        Update: {
          room_id?: number
          row?: number
          column?: number
          type?: string | null
        }
      }
      objects: {
        Row: {
          id: number
          breakable: boolean
          modifier: string | null
          type: string
          room_id: number
          row: number
          column: number
        }
        Insert: {
          id?: number
          breakable: boolean
          modifier?: string | null
          type: string
          room_id: number
          row: number
          column: number
        }
        Update: {
          id?: number
          breakable?: boolean
          modifier?: string | null
          type?: string
          room_id?: number
          row?: number
          column?: number
        }
      }
      players: {
        Row: {
          id: number
          created_at: string | null
          room_id: number | null
          modifiers: string[]
          piece_id: number | null
          color: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          room_id?: number | null
          modifiers: string[]
          piece_id?: number | null
          color: string
        }
        Update: {
          id?: number
          created_at?: string | null
          room_id?: number | null
          modifiers?: string[]
          piece_id?: number | null
          color?: string
        }
      }
      rooms: {
        Row: {
          id: number
          created_at: string | null
          rows: number
          columns: number
        }
        Insert: {
          id?: number
          created_at?: string | null
          rows: number
          columns: number
        }
        Update: {
          id?: number
          created_at?: string | null
          rows?: number
          columns?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
