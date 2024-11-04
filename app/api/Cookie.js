import { cookies } from "next/headers";

export function cookie(){
    return cookies().get('name');
}