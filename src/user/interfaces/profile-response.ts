export interface ProfileResponse {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}
