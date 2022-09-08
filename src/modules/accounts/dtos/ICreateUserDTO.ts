interface IUserCreateDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar?: string;
}

export { IUserCreateDTO };
