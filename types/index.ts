export enum ModalType {
  Add = 'add',
  Edit = 'edit'
}

export interface InterfaceContactItem {
  key: string;
  name: string;
  telefon: string;
  email: string;
}

export type InterfaceContactItems = InterfaceContactItem[];