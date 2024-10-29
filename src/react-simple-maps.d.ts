declare module "react-simple-maps" {
  import { ComponentType, ReactNode } from "react";

  export const ComposableMap: ComponentType<any>;

  // Update Geographies to accept children
  export const Geographies: ComponentType<{
    geography: string;
    children: (props: { geographies: any[] }) => ReactNode; // Allow children as a function
  }>;

  export const Geography: ComponentType<{ geography: any; key: string }>;
}
