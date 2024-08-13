import { User } from "./user";

export class Event {
    id: string;
    name: string;
    date: Date;
    description: string;
    access: string;
    membersAmount: number;
    ownerId: string;
    place: string;
    members: string[];
}