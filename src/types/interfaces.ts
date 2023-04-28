export interface FullMemberBody {
  first_name: string;
  last_name: string;
  date_of_entry: Date;
  email: string;
  gender: string;
  phone: string;
  birthday: string;
  address: {
    post_code: string;
    country: string;
    street_name: string;
    street_number: number;
    floor?: string;
    apartment?: string;
  };
  image: {
    name?: string;
    description?: Text;
    url: string;
    type?: string;
  };
  roleId: number;
  clubId: number;
}

export interface FullEventBody {
  name: string;
  description: Text;
  is_public: boolean;
  start_at: Date;
  end_at: Date;
  entry_fee: number;
  capacity: number;
  address: {
    post_code: string;
    country: string;
    street_name: string;
    street_number: number;
    floor?: string;
    apartment?: string;
  };
  image?: {
    name?: string;
    description?: Text;
    url?: string;
    type?: string;
  };
  clubId: number;
}

export interface UpdateMemberBody {
  first_name?: string;
  last_name?: string;
  date_of_entry?: Date;
  email?: string;
  gender?: string;
  phone?: string;
  birthday?: string;
  address?: {
    post_code?: string;
    country?: string;
    street_name?: string;
    street_number?: number;
    floor?: string;
    apartment?: string;
  };
  image?: {
    name?: string;
    description?: Text;
    url?: string;
    type?: string;
  };
  roleId?: number;
  clubId?: number;
}

export interface MemberBody {
  _id: number;
  first_name: string;
  last_name: string;
  date_of_entry: Date;
  email: string;
  gender: string;
  phone: string;
  birthdate: string;
  addressId: number;
  roleId: number;
  clubId: number;
}

export interface EventBody {
  _id: number;
  name: string;
  description: string;
  is_public: boolean;
  date: Date;
  start_at: Date;
  ends_at: Date;
  entry_fee: number;
  capacity: number;
  clubId: number;
  addressId: number;
}

export interface ClubBody {
  id: number;
  name: string;
  description: string;
  image?: {
    name?: string;
    description?: Text;
    url?: string;
    type?: string;
  };
}

export interface UserBody {
  _id: number;
  username: string;
  password: string;
  isAdmin: boolean;
  memberId: number;
}

export interface AddressBody {
  _id: number;
  post_code: string;
  country: string;
  street_name: string;
  street_number: number;
  floor?: string;
  apartment?: string;
}

export interface ImageBody {
  _id: number;
  name?: string;
  description?: Text;
  url: string;
  type?: string;
}

export interface RegisterUserProps {
  username: string;
  password: string;
  isAdmin: boolean;
}

