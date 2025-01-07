import { useTheme } from "@rneui/themed";
import { Text, TextProps } from "@rneui/base";
import { StyleSheet, TextStyle, useColorScheme } from "react-native";
import { useEffect } from "react";

interface CustomTextProps extends TextProps {
  /**Font Weight */
  bold?: boolean;
  semibold?: boolean;
  normal?: boolean;
  /**Font Size */
  md?: boolean;
  bg?: boolean;
  sm?: boolean;
  /**misc */
  secondary?: boolean;
}

function CText({
  bold,
  semibold,
  normal,
  md,
  bg,
  sm,
  secondary,
  ...props
}: CustomTextProps) {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const styling: { size: TextStyle; weight: TextStyle; color: TextStyle } = {
    size: styles.sm,
    weight: styles.normalText,
    color: { color: theme.colors.black },
  };

  /** Select font color */
  if (secondary && colorScheme === "light") {
    styling.color = { color: theme.colors.grey3 };
  } else if (secondary && colorScheme === "dark") {
    styling.color = { color: theme.colors.grey4 };
  } else if (!secondary && colorScheme === "dark") {
    styling.color = { color: theme.colors.white };
  }

  /** Size */
  if (sm) {
    styling.size = styles.sm;
  } else if (md) {
    styling.size = styles.md;
  } else if (bg) {
    styling.size = styles.bg;
  }

  /** Weight */
  if (semibold) {
    styling.weight = styles.semiboldText;
  } else if (bold) {
    styling.weight = styles.boldText;
  }

  return (
    <Text {...props} style={[styling.size, styling.weight, styling.color]} />
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  semiboldText: {
    fontWeight: "600",
  },
  normalText: {
    fontWeight: "normal",
  },
  sm: {
    fontSize: 19,
  },
  md: {
    fontSize: 28,
  },
  bg: {
    fontSize: 37,
  },
});

export default CText;
