import { OverridableComponent } from "@mui/types";
import { SvgIconTypeMap } from "@mui/material";

declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;

  export default src;
}

declare module "@material-ui/core" {
  type MaterialIcon = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}
