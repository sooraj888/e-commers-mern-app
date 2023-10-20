declare module "react-alert-template-basic" {
  import { AlertComponentPropsWithStyle } from "react-alert";

  const AlertTemplate: React.FC<AlertComponentPropsWithStyle>;
  export default AlertTemplate;
}

declare module "overlay-navbar" {
  export interface ReactNavbarProps {
    // add the props that you want to use from the module
    color?: string;
    logo?: string;
    menu?: any[];
    social?: any[];
  }

  export class ReactNavbar extends React.Component<any> {}
}
