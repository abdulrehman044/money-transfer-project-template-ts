import { Connection, WorkflowClient } from "@temporalio/client";
import { AddPtoWorkflow } from "./workflows";

async function run(): Promise<string> {
    const connection = await Connection.connect();
    const client = new WorkflowClient({ connection });

    console.log(
        `Starting add PTOs`
    );

    const handle = await client.start(AddPtoWorkflow, {
        taskQueue: 'poc',
        workflowId: `Add_PTO_${Date.now()}`,
        // cronSchedule: '* * * * *',
    });


    console.log(
        `Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`
    );

    let result = await handle.result();
    console.log(result);
    return result;
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
  // @@@SNIPEND
