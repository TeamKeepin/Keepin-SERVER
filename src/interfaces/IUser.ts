import mongoose from "mongoose";
export interface IUser {
    name: string;
    id: string;
    password: string;
    birth: string;
    token: string;
  }
  
  export interface IUserInputDTO {
    name: string;
    id: string;
    password: string;
  }
