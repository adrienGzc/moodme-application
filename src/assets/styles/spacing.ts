import { baseSpacer } from './variables';

const Keywords: object = {
  mg: 'margin',
  mgv: 'marginVertical',
  mgh: 'marginHorizontal',
  mgt: 'marginTop',
  mgr: 'marginRight',
  mgb: 'marginBottom',
  mgl: 'marginLeft',
  pg: 'padding',
  pgv: 'paddingVertical',
  pgh: 'paddingHorizontal',
  pgt: 'paddingTop',
  pgr: 'paddingRight',
  pgb: 'paddingBottom',
  pgl: 'paddingLeft',
};

const Multipliers: number[] = [
  0.25,
  0.5,
  1,
  1.5,
  1.75,
  2,
  2.5,
  3,
  4,
  4.5,
  5,
  8,
];

function createSpacings(keywords: object, multipliers: number[]) {
  const spacings: any = {};

  for (const [key, keyword] of Object.entries(keywords)) {
    multipliers.forEach((multiplier) => {
      spacings[`${key + multiplier.toString().replace('.', '_')}`] = {
        [keyword]: baseSpacer * multiplier,
      };
    });
  }

  return spacings;
}

const spacing = createSpacings(Keywords, Multipliers);
export default spacing;
