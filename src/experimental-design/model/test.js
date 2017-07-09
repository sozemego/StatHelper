
let testsCreated = 0;

export const createNewTest = () => {
    const name = "Test " + ++testsCreated;

    return {
        name
    }
};