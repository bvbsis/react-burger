import bunPlugStyles from "./plug-constructor-element.module.css";

function PlugConstructorElement({ type, description }) {
  const plugType =
    type === "top"
      ? bunPlugStyles.bunPlug_top
      : type === "center"
      ? bunPlugStyles.bunPlug_center
      : bunPlugStyles.bunPlug_bottom;
  return (
    <div className={`${bunPlugStyles.bunPlug} ${plugType}`}>
      <span className={bunPlugStyles.bunPlug__description}>{description}</span>
    </div>
  );
}

export default PlugConstructorElement;
