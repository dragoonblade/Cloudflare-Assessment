/**
 * @method getRandomInt
 * @description Get a random integer
 * @param {number} max
 */
export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max + 1));
  }