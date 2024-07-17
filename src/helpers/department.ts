/*
 * Get department name from path
 * @param path
 * @returns department name
 *
 * @example
 * ```ts
 * getDepartmentNameFromPath('/institution A/out_care/Radiologie/supervisor') // returns 'Radiologie'
 */
export const getDepartmentNameFromPath = (path: string = '') => {
  return path.split('/')[path.split('/').length - 2];
};
