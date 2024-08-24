export interface ModalState {
    modalType: string;
    modalProps: any; // You can replace "any" with a more specific type if needed
    isOpened: boolean;
  }
  
  export interface ModalLookup {
    [modalType: string]: React.ComponentType<any> | undefined; // Adjust "any" to match the expected props
  }