import path from "path";
import * as types from "@onflow/types";
import {
  init,
  sendTransaction,
  deployContractByName,
  getTransactionCode,
} from "flow-js-testing/dist";
import { getScriptCode } from "flow-js-testing/dist/utils/file";
import { executeScript } from "flow-js-testing/dist/utils/interaction";
import { getContractAddress } from "flow-js-testing/dist/utils/contract";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";

const basePath = path.resolve(__dirname, "../cadence_BuildATaskTracker");

beforeAll(() => {
  init(basePath);
});

describe("Replicate Playground Accounts", () => {
  test("Create Accounts", async () => {
    // Playground project support 4 accounts, but nothing stops you from creating more by following the example laid out below
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");
    const Charlie = await getAccountAddress("Charlie");
    const Dave = await getAccountAddress("Dave");

    console.log(
      "Four Playground accounts were created with following addresses"
    );
    console.log("Alice:", Alice);
    console.log("Bob:", Bob);
    console.log("Charlie:", Charlie);
    console.log("Dave:", Dave);
  });
});

describe("Deployment", () => {
  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("Alice");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy TaskTracker contract", async () => {
    const name = "TaskTracker";
    const to = await getAccountAddress("Bob");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("Charlie");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("Dave");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });
});

describe("Transactions", () => {
  test("test transaction template Transaction", async () => {
    const name = "Transaction";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Define arguments
    const args = [["Hello", types.String]];

    // Generate addressMap from import statements
    const HelloWorld = await getContractAddress("HelloWorld");
    const TaskTracker = await getContractAddress("TaskTracker");

    const addressMap = {
      HelloWorld,
      TaskTracker,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        args,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Save Resource", async () => {
    const name = "Save Resource";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Define arguments
    const args = [["Hello", types.String]];

    // Generate addressMap from import statements
    const TaskTracker = await getContractAddress("TaskTracker");

    const addressMap = {
      TaskTracker,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        args,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Add Task", async () => {
    const name = "Add Task";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Define arguments
    const args = [["Hello", types.String]];

    // Generate addressMap from import statements
    const TaskTracker = await getContractAddress("TaskTracker");

    const addressMap = {
      TaskTracker,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        args,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Remove Task", async () => {
    const name = "Remove Task";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Define arguments
    const args = [["Unsupported", types.Integer]];

    // Generate addressMap from import statements
    const TaskTracker = await getContractAddress("TaskTracker");

    const addressMap = {
      TaskTracker,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        args,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template View Tasks", async () => {
    const name = "View Tasks";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const TaskTracker = await getContractAddress("TaskTracker");

    const addressMap = {
      TaskTracker,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });
});

describe("Scripts", () => {
  test("test script template Script", async () => {
    const name = "Script";

    // Generate addressMap from import statements
    const HelloWorld = await getContractAddress("HelloWorld");

    const addressMap = {
      HelloWorld,
    };

    let code = await getScriptCode({
      name,
      addressMap,
    });

    const result = await executeScript({
      code,
    });

    // Add your expectations here
    expect().toBe();
  });
});
