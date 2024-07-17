export interface NodeConfiguration {
  light: number;
  dark: number;
}

export const getLabelRotation = (index: number) => {
  return {
    transform: [
      {
        rotate: `-${index * 30}deg`,
      },
    ],
  };
};
