import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import * as activities from './activities'
import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { User } from "./user_model";

export async function AddPtoWorkflow(): Promise<string> {
    const { fetchUsers, addPtos, notifyUser, notifySingleUser } = proxyActivities<typeof activities>({
        retry: {
            initialInterval: '1 second',
            maximumInterval: '1 minute',
            backoffCoefficient: 2,
            maximumAttempts: 500,
        },
        startToCloseTimeout: '1 minute',
    });

    // Call the addPtos function
    try {
        // Fetch all users
        let data: User[] = await fetchUsers();
        for (const user of data) {
            // Add PTO
            var uid = await addPtos(user);
            // Notify users
            notifySingleUser(uid);
        }
    } catch (error) {
        console.log(error);
        throw new ApplicationFailure(`Function failed. Error: ${error}`);
    }

    return 'Workflow completed';
}

