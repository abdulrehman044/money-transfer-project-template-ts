import { Worker } from "@temporalio/worker"
import * as activities from './activities'
import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK with your service account credentials
var serviceAccount = require('../service.json');

async function run() {
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows'),
        taskQueue: 'poc',
        activities,
    });

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    await worker.run();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});

