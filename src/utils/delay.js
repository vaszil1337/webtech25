export const setDelay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}