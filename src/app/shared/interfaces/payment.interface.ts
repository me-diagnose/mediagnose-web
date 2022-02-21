export interface IPaypalResponseResult {
  id: string;
  status: OrderStatus;
  links: ILink[];
}

export enum OrderStatus {
  CREATED = 'CREATED',
  COMPLETED = 'COMPLETED'
}

export interface ILink {
  href: string,
  rel: Rel,
  method: string
}

export enum Rel {
  SELF = 'self',
  APPROVE = 'approve',
  UPDATE = 'Update',
  CAPTURE = 'capture'
}
