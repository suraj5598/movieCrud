interface MovieInterface {
    name: string | null;
    year: number | null;
    description: string | null;
    poster: string | null;
    createdAt: string;
  }

  interface AdminInterface {
    name: string | null;
    email: string | null;
    password: string | null;
    createdAt: string;
  }



export {
    MovieInterface,
    AdminInterface
}