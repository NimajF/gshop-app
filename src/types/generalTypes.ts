export type ProductFormData = Omit<ProductData, "_id">;

export type ProductData = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: (string | File)[];
  published: boolean;
};

export type UserData = {
  username: string;
  email: string;
  password?: string;
  alias?: string;
  role?: "user" | "admin";
  imageFile?: string | File;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
};
