// src/modules/av-hire/av-hire.categories.ts

export const AVHireCategories = {
  LIGHTING: 'lighting',
  SOUND: 'sound',
  EFFECTS: 'effects',
} as const;

export type AVHireCategory = (typeof AVHireCategories)[keyof typeof AVHireCategories];