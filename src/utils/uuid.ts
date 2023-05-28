/**
 * Function to generate the unique uuid
 * @returns uuid as a string
 */
const getUuid = () => {
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    return uuid
  }

  export { getUuid }
  