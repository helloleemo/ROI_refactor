/**
 * Returns evenly distributed tick positions for a category axis.
 * @param length - Total number of categories
 * @param count  - Desired number of visible labels (default: 10)
 */
export const createTickPositioner = (length: number, count = 10): number[] => {
    const step = Math.max(1, Math.floor(length / count));
    const positions: number[] = [];
    for (let i = 0; i < length; i += step) {
        positions.push(i);
    }
    return positions;
};
