export interface Site {
  id: string
  site: string
  address: {
    street_1: string
    street_2: string
    area: null | String
    city: string
    state: string
    zipcode: string
    country: string
    coordinates: string
    timezone: string
  }
  member: Array<{
    id: string
    profile: UserProfile
    access: MemberAccess
  }>
  devices: number
}

export interface SiteInput {
  id?: string
  name: string
  streetAddress1: string
  streetAddress2: string
  area: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  mobile_number: null | string
  phone_number: null | string
}

export interface GroupMember {
  profile: UserProfile
  access: MemberAccess
}

export type MemberAccess = "administrator" | "employee"
