import { ButtonProps } from "@rneui/base";
import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface CustomButtonProps extends ButtonProps {
  buttonType?: "warn" | "danger" | "full" | "outline" | "textOnly";
  full?: boolean;
  half?: boolean;
}

export default function CButton({
  buttonType = "full",
  ...props
}: CustomButtonProps) {
  const style = buttonStyles;
  const styles = getButtonStyle(buttonType);
  return (
    <Button
      {...props}
      buttonStyle={[style.buttonBase, styles]}
      titleStyle={
        buttonType === "textOnly" ? { color: "blue" } : { color: "white" }
      }
      activeOpacity={0}
    />
  );
}

const getButtonStyle = (buttonType: string) => {
  const style = buttonStyles;
  switch (buttonType) {
    case "warn":
      return [style.buttonWarn];
    case "danger":
      return style.buttonDanger;
    case "full":
      return style.buttonFull;
    case "outline":
      return style.buttonOutline;
    case "textOnly":
      return style.buttonTextOnly;
    default:
      return {};
  }
};

const buttonStyles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonFull: {
    backgroundColor: "#007BFF",
  },
  buttonWarn: {
    backgroundColor: "#FF9900",
  },
  buttonDanger: {
    backgroundColor: "#FF0000",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 1,
  },
  buttonTextOnly: {
    backgroundColor: "transparent",
    padding: 0,
  },
  textWhite: {
    color: "#FFFFFF",
  },
  textBlack: {
    color: "#000000",
  },
});
