import { MockActivityEnvironment } from "@temporalio/testing";
import { describe, it } from "mocha";
import assert from "assert";
import * as activities from "../activities";
import { User } from "../user_model";
import * as admin from 'firebase-admin';
var serviceAccount = require('../../service.json');
import { userData } from "../data";

describe('Add PTO activities', () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    it('Fetch Users test', async () => {
        const env = new MockActivityEnvironment();
        const result = await env.run(activities.fetchUsers);
        assert(Array.isArray(result)); // Verifies the result is an Array
        assert(result.length != 0) // Verifies array is not empty
        assert(result[0].uid != '') // Verifies valid users
    }).timeout(5000);

    it('Add PTO test', async () => {
        const env = new MockActivityEnvironment({ attempt: 5 });
        const dummyUser = User.fromJSON(userData);
        const result = await env.run(activities.addPtos, dummyUser);
        assert.equal(dummyUser.uid, result); // Verifies result returns a UID upon success
        assert.doesNotThrow(() => {
            return 'Failed';
        });
    }).timeout(5000);

    it('Notify User test', async () => {
        const env = new MockActivityEnvironment();
        const dummyUser = User.fromJSON(userData);
        const result = await env.run(activities.notifySingleUser, dummyUser.uid);
        assert.equal(result, 'PTO added');

    }).timeout(5000);
})