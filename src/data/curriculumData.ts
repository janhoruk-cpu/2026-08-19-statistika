import { ChapterConfig, UnitConfig } from '../types';
import { chapter0 } from './chapters/chapter0';
import { chapter1 } from './chapters/chapter1';
import { chapter2 } from './chapters/chapter2';
import { chapter3 } from './chapters/chapter3';
import { chapter4 } from './chapters/chapter4';
import { chapter5 } from './chapters/chapter5';
import { chapter6 } from './chapters/chapter6';
import { chapter7 } from './chapters/chapter7';
import { chapter8 } from './chapters/chapter8';
import { chapter9 } from './chapters/chapter9';
import { chapter10 } from './chapters/chapter10';
import { chapter11 } from './chapters/chapter11';
import { chapter12 } from './chapters/chapter12';

export const ALL_CHAPTERS: ChapterConfig[] = [
  chapter0,
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10,
  chapter11,
  chapter12,
];

export const ALL_UNITS: UnitConfig[] = ALL_CHAPTERS.flatMap(ch => ch.units);

export const UNIT_MAP: Record<string, UnitConfig> = ALL_UNITS.reduce(
  (acc, unit) => {
    acc[unit.id] = unit;
    return acc;
  },
  {} as Record<string, UnitConfig>
);

export function getUnitById(id: string): UnitConfig | undefined {
  return UNIT_MAP[id];
}

export function getNextUnit(currentId: string): UnitConfig | null {
  const index = ALL_UNITS.findIndex(u => u.id === currentId);
  if (index >= 0 && index < ALL_UNITS.length - 1) {
    return ALL_UNITS[index + 1];
  }
  return null;
}

export function getPrevUnit(currentId: string): UnitConfig | null {
  const index = ALL_UNITS.findIndex(u => u.id === currentId);
  if (index > 0) {
    return ALL_UNITS[index - 1];
  }
  return null;
}
