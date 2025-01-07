import * as yup from "yup";
import { CreateAccount, LoginWithEmail } from "@backend/auth";
import { AuthStackParamsList } from "@components/stacks/AuthStacks";
import CButton from "@customComponents/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { Card } from "@rneui/base";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { NewUserSchema } from "./NewUserSchema";
import Login from "./Login";

type NewUserProps = StackScreenProps<AuthStackParamsList, "NewUser">;

function NewUser({ navigation }: NewUserProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigation.navigate("Login");
  };

  const handleNew = async () => {
    setIsLoading(true);
    setTimeout(() => {}, 10000000000);
    try {
      await NewUserSchema.validate(
        {
          firstname: firstName,
          lastname: lastName,
          username: username,
          email,
          password,
        },
        { abortEarly: false }
      );
      const res = await CreateAccount(
        firstName,
        lastName,
        username,
        email,
        password
      );
      if (res) {
        await LoginWithEmail(email, password);
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          console.log(`${err.path}: ${err.message}`);
        });
      } else {
        console.log("unknown error");
      }
    }
    setIsLoading(false);
  };
  const { t } = useTranslation();

  const style = NewUserStyles;
  return (
    <View style={style.container}>
      <Card containerStyle={style.card}>
        <Input
          placeholder={t("FirstNamePlaceholder")}
          onChangeText={(name) => setFirstName(name)}
        />
        <Input
          placeholder={t("LastNamePlaceholder")}
          onChangeText={(name) => setLastName(name)}
        />
        <Input
          placeholder={t("UsernamePlaceholder")}
          onChangeText={(username) => setUsername(username)}
        />
        <Input
          placeholder={t("EmailPlaceholder")}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          placeholder={t("PasswordPlaceholder")}
          onChangeText={(passowrd) => setPassword(passowrd)}
        />
        <View style={style.buttonContainer}>
          <CButton
            title={t("Back")}
            buttonType="textOnly"
            onPress={handleBack}
            disabled={isLoading}
          />
          <CButton
            title={t("CreateAccount")}
            onPress={handleNew}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </Card>
    </View>
  );
}

const NewUserStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  card: {
    paddingTop: 25,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NewUser;
