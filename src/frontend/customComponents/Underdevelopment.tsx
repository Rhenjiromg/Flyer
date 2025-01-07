import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import CText from "./Text";
import { useTranslation } from "react-i18next";
import { Button } from "@rneui/base";
import { auth } from "@backend/firebase";

function UnderDevelopment() {
  const style = styles;
  const { t } = useTranslation();
  return (
    <View style={style.container}>
      <CText style={style.text} bg bold>
        {t("Underdevelopment")}
      </CText>
      <Button
        title={"test"}
        onPress={() => {
          auth.signOut();
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
});

export default UnderDevelopment;
