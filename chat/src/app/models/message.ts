import { user } from "./users";

export interface message{
    content: string,
    type: string,
    date: Date,
    user: user
}// Estructura del mensaje
    