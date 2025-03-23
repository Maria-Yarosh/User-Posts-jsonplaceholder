interface IUserDataResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  export interface IUser {
    id: number;
    name: string;
    fullAdress: string;
    phone: string;
    companyName: string;
  }
  
  export const getUserData = (data: IUserDataResponse[]): IUser[] => {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        fullAdress: item.address.city + " " + item.address.street,
        phone: item.phone,
        companyName: item.company.name,
      };
    });
  };
  