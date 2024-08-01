import { collection, getDocs, getFirestore } from "firebase/firestore";
import * as admin from 'firebase-admin';
import { FieldValue } from "@google-cloud/firestore";

export async function addPtos(): Promise<string[]> {

    var usersToNotify: string[] = [];
    var items: any[] = [];
    var result = await admin.firestore().collection('users').get();
    items = [...(result.docs), ...(result.docs), ...(result.docs)];
    console.log(result.docs.length)
    console.log(items.length);

    var counter = 0;

    for (const element of items) {
        // try {
        const docSnapshot = await element.ref.get();
        if (!docSnapshot.exists) {
            throw new Error('Document does not exist');
        }


        if (counter == 7) {
            throw new Error("Test error");
        }

        const currentData = docSnapshot.data();
        const currentPto = currentData?.leaves?.pto || 0;

        const newPto = currentPto + 1.5;

        await element.ref.update({
            'leaves.pto': newPto
        });
        counter++;

        console.log(`Added PTO for ${element.data()['email']}`)
        usersToNotify.push(element.id);
        // }
        // catch (e) {
        //     console.log(e);
        //     console.log(`Failed to add PTO for ${element.data()['email']} - ${e}`)
        // }
    }

    console.log('Added ptos');
    return usersToNotify;
}

export async function notifyUser(users: string[]): Promise<string> {

    for (const element of users) {
        try {
            await admin.firestore().collection('users').doc(element).collection('notifications').add({
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