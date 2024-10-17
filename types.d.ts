export interface UserResponse {
  message: string;
  has_error: boolean;
  data: {
    user: {
      full_name: string;
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
      address: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    token: string;
    refreshToken: string;
  };
}
