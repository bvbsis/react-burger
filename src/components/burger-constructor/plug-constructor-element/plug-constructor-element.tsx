import { FC } from "react";
import bunPlugStyles from "./plug-constructor-element.module.css";

interface IPlugConstructorElementProps {
  type: "top" | "center" | "bottom";
  description: string;
}

const PlugConstructorElement: FC<IPlugConstructorElementProps> = ({
  type,
  description,
}) => {
  const plugType =
    type === "top"
      ? bunPlugStyles.bunPlug_top
      : type === "center"
      ? bunPlugStyles.bunPlug_center
      : type === "bottom"
      ? bunPlugStyles.bunPlug_bottom
      : bunPlugStyles.bunPlug_top;
  return (
    <div className={`${bunPlugStyles.bunPlug} ${plugType}`}>
      <span className={bunPlugStyles.bunPlug__description}>{description}</span>
    </div>
  );
};

export default PlugConstructorElement;
