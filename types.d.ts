import { PortableTextBlock } from "sanity";

export interface UserResponse {
  message: string;
  has_error: boolean;
  data: {
    user: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      sex: string;
      referal_code: string;
      role: string;
      isVerified: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    profile: {
      user: string;
      state: string;
      location_area: string;
      address: {
        address: string;
        longitude: string;
        latitude: string;
      };
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    token: string;
    refreshToken: string;
    tokenExpTime: string;
  };
}

export type Author = {
  name: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  bio?: string;
  slug: {
    current: string;
  };
  _id?: number | string;
  _ref?: number | string;
};

export type Slug = {
  current: string;
  _type: string;
};

export type Categories = {
  _id: string;
  title: string;
  slug: Slug;
};

export type Blog = {
  _id: number;
  title: string;
  slug: Slug;
  categories: Categories[];
  body: PortableTextBlock[];
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  author: Author;
  publishedAt: string;
};
