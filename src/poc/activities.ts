import { firestore } from 'firebase-admin';
import { FieldValue, QueryDocumentSnapshot } from "@google-cloud/firestore";
import { User } from "./user_model";

export type IncrementFunction = () => void;

export async function addPtos(user: User): Promise<string> {
    try {
        const currentPto = user?.leaves?.pto || 0;
        const newPto = currentPto + 1.5;
        await firestore().collection('users').doc(user.uid).update({
            'leaves.pto': newPto
        });

        console.log(`Added PTO for ${user.email}`)

    }
    catch (e) {
        console.log(e);
        console.log(`Failed to add PTO for ${user.email} - ${e}`)
        throw Error('Failed');
    }
    return user.uid;
}

export async function fetchUsers(): Promise<User[]> {
    var items: any[] = [];
    var result = await firestore().collection('users').get();
    for (const i of result.docs) {
        items.push(User.fromJSON(i.data()));
    }
    return items;
}

export async function notifyUser(users: string[]): Promise<string> {

    for (const element of users) {
        try {
            await firestore().collection('users').doc(element).collection('notifications').add({
                'createdAt': new Date().toISOString(),
                'notification': '1.5 PTO was added to your quota',
                'read': false,
            });
            console.log(`added notif for ${element}`);
        }
        catch (e) {
            console.log(`Failed to add notification for ${element}`)
        }
    }

    console.log('Added notifs');
    return 'PTO added';
}

export async function notifySingleUser(user: string): Promise<string> {

    try {
        await firestore().collection('users').doc(user).collection('notifications').add({
            'createdAt': new Date().toISOString(),
            'notification': '1.5 PTO was added to your quota',
            'read': false,
        });
        console.log(`added notif for ${user}`);
    }
    catch (e) {
        console.log(`Failed to add notification for ${user}`)
    }

    return 'PTO added';
}