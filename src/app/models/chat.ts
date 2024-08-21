export class Chat {
    id: string;
    lastMessage?: string;
    lastmessageDate?: Date;
    userIds: string[];
    usersInfo: {name: string, photo: string}[]
    chatImageUrl?: string;
    chatName?: string;
}