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
          id: number
        }
        Insert: {
          room_id: number
          row: number
          column: number
          id?: number
        }
        Update: {
          room_id?: number
          row?: number
          column?: number
          id?: number
        }
      }
      objects: {
        Row: {
          id: number
          cell_id: number
          breakable: boolean
          modifier: string | null
          type: string
        }
        Insert: {
          id?: number
          cell_id: number
          breakable: boolean
          modifier?: string | null
          type: string
        }
        Update: {
          id?: number
          cell_id?: number
          breakable?: boolean
          modifier?: string | null
          type?: string
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
          temp: number | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          temp?: number | null
        }
        Update: {
          id?: number
          created_at?: string | null
          temp?: number | null
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
