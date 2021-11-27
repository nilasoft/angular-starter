export type Expression =
  | { type: 'attribute'; path: string; }
  | { type: 'literal'; value: any; }
  | { type: 'not'; restriction: Expression; }
  | { type: 'and'; restrictions: Expression[]; }
  | { type: 'or'; restrictions: Expression[]; }
  | { type: 'equal'; x: Expression; y: Expression; }
  | { type: 'greater'; x: Expression; y: Expression; }
  | { type: 'greater-equal'; x: Expression; y: Expression; }
  | { type: 'less'; x: Expression; y: Expression; }
  | { type: 'less-equal'; x: Expression; y: Expression; }
  | { type: 'between'; v: Expression; x: Expression; y: Expression; }
  | { type: 'like'; x: Expression; pattern: Expression; };
