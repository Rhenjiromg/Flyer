import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import CText from "./Text";

interface LoaderProps {
  isLoading?: boolean;
  fullScreen?: boolean;
}
export default function Loader({
  isLoading = false,
  fullScreen = true,
}: LoaderProps) {
  const { t } = useTranslation();
  const style = loaderStyles;
  return (
    <View style={style.container}>
      {fullScreen ? (
        isLoading ? (
          <View style={style.fullScreenLoader}>
            <CText md semibold>
              {t("Loading")}
            </CText>
          </View>
        ) : (
          <View></View>
        )
      ) : (
        <View>{/**Put loader here  */}</View>
      )}
    </View>
  );
}

const loaderStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  fullScreenLoader: {
    backgroundColor: "rgba(82, 82, 82, 0.22)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
