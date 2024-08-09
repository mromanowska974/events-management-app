export class Event {
    id: string = '';
    name: string = '';
    date: Date = new Date();
    description: string = '';
    access: string = '';
    membersAmount: number = 0;
    ownerId: string = '';
    place: string = '';
    members: any[] = [];
}