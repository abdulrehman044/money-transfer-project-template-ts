import { ApplicationFailure, proxyActivities } from "@temporalio/workflow";
import * as activities from './activities'

export async function AddPtoWorkflow(): Promise<string> {
    const { addPtos, notifyUser } = proxyActivities<typeof activities>({
        retry: {
            initialInterval: '1 second',
            maximumInterval: '1 minute',
            backoffCoefficient: 2,
            maximumAttempts: 500,
        },
        startToCloseTimeout: '1 minute',
    });

    // Call the addPtos function
    let result: string[];

    try {
        result = await addPtos();
    } catch (error) {
        throw new ApplicationFailure(`Function failed. Error: ${error}`);
    }

    // Notifying the user that ptos were added for
    try {
        await notifyUser(result);
    } catch (error) {
        throw new ApplicationFailure(`Function failed. Error: ${error}`);
    }

    // function 3

    return 'Workflow completed';
}

