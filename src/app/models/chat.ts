import { Timestamp } from "firebase/firestore";

export class Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Timestamp;
    userIds: string[];
    usersInfo: {name: string, photo: string}[]
    chatImageUrl?: string;
    chatName?: string;
}