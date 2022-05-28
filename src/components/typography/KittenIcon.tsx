import { Icon } from "@ui-kitten/components";
import { useContext } from "react";
import { AppContext } from "../../app/app-context";

interface KittenIconModel {
  name: string;
  fill?: string;
  height?: number;
  width?: number;
}

export default function KittenIcon(props: KittenIconModel) {
  const appContext = useContext(AppContext);

  // @ts-ignore
  const height = props.height | 24;
  // @ts-ignore
  const width = props.width | 24;
  return (
    <Icon
      style={{ width, height }}
      name={props.name}
      fill={appContext.isDarkTheme ? "white" : "black"}
    />
  );
}
