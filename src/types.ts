export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  mobile_number: string | null
  phone_number: string | null
}

export interface GroupMember {
  profile: UserProfile
  access: MemberAccess
}

export type MemberAccess = "administrator" | "employee"
