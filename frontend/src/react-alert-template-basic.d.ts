declare module "react-alert-template-basic" {
  import { AlertComponentPropsWithStyle } from "react-alert";
  const AlertTemplate: React.FC<AlertComponentPropsWithStyle>;
  export default AlertTemplate;
}

declare module "overlay-navbar" {
  export interface ReactNavbarProps {}

  export class ReactNavbar extends React.Component<any> {}
}

declare module "react-rating-stars-component" {
  export default any;
}

declare module "react-responsive-carousel" {
  // export the types that you need, or use 'any' if you don't care
  export type CarouselProps = any;
  export class Carousel extends React.Component<CarouselProps> {}
  // export any other components or functions from the module
}
