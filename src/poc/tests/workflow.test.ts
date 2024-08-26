// import { TestWorkflowEnvironment } from '@temporalio/testing';
// import { describe, after, before, it } from 'mocha';
// import assert from 'assert';
// import { AddPtoWorkflow } from '../workflows';
// import { User } from '../user_model';
// import { userData } from '../data';
// import { Worker } from '@temporalio/worker';
// import { ApplicationFailure } from '@temporalio/common/lib/failure';

// describe('AddPtoWorkflow', () => {
//     let testEnv: TestWorkflowEnvironment;
//     before(async function () {
//         // this.timeout(20000); // 20 seconds
//         testEnv = await TestWorkflowEnvironment.createTimeSkipping();
//     });

//     after(async () => {
//         await testEnv?.teardown();
//     });

//     it('should complete successfully when all activities succeed', async function () {
//         const worker = await Worker.create({
//             connection: testEnv.nativeConnection,
//             taskQueue: 'test',
//             workflowsPath: require.resolve('../workflows'),
//             activities: {
//                 fetchUsers: async () => [User.fromJSON(userData)],
//                 addPtos: async () => '1',
//                 notifySingleUser: async () => 'PTO added',
//             },
//         });

//         console.log('worker was created');

//         await worker.runUntil(async () => {
//             const result = await testEnv.client.workflow.execute(AddPtoWorkflow, {
//                 taskQueue: 'test',
//                 workflowId: 'test-add-pto-workflow',
//             });

//             assert.equal(
//                 result,
//                 'Workflow completed'
//             );
//         });
//     });

//     it('should retry add pto 2 times', async () => {
//         let attempt = 0;

//         const worker = await Worker.create({
//             connection: testEnv.nativeConnection,
//             taskQueue: 'test',
//             workflowsPath: require.resolve('../workflows'),
//             activities: {
//                 fetchUsers: async () => [User.fromJSON(userData)],
//                 addPtos: async () => {
//                     attempt++;
//                     if (attempt < 2) {
//                         throw ApplicationFailure.retryable('Temporary failure, retrying...');
//                     }
//                     return '1';
//                 },
//                 notifySingleUser: async () => 'PTO added',
//             },
//         });

//         console.log('worker was created');

//         await worker.runUntil(async () => {
//             var result = await testEnv.client.workflow.execute(AddPtoWorkflow, {
//                 taskQueue: 'test',
//                 workflowId: 'test-add-pto-workflow',
//             });

//             assert.equal(
//                 result,
//                 'Workflow completed'
//             );
//         });
//     });
// });
