import { math } from 'polished';

export const shrinkOne = (value: string | number) => math(`${value} - 1`);
