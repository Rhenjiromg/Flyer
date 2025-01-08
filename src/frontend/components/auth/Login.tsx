import CButton from "@customComponents/Button";
import { Card, Icon, Input } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { LoginWithEmail } from "@backend/auth";
import { Toast } from "toastify-react-native";
import CText from "@customComponents/Text";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamsList } from "@components/stacks/AuthStacks";
import { loginSchema } from "./LoginSchema";
import * as yup from "yup";

type LoginProps = StackScreenProps<AuthStackParamsList, "Login">;

export default function Login({ navigation }: LoginProps) {
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      /**
      await loginSchema.validate(
        { credentials, password },
        { abortEarly: false }
      );*/
      const res = await LoginWithEmail("test@gmail.com", "Test123");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorObj: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          console.log(err);
          if (err.path) errorObj[err.path] = err.message;
        });
        setErrors(errorObj);
      } else {
        Toast.error("Error during login process.");
      }
    }
  };

  const handleNewUser = () => {
    navigation.navigate("NewUser");
  };

  const updateError = (field: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const style = LoginStyles;

  return (
    <View style={style.container}>
      <Card containerStyle={style.card}>
        <CText bg bold style={style.title}>
          {t("Title")}
        </CText>

        <Input
          placeholder={t("CredentialPlaceholder")}
          value={credentials}
          onChangeText={(cred) => {
            setCredentials(cred);
            updateError("Credentials");
          }}
          errorMessage={t(errors.Credentials)}
          errorStyle={errors.Credentials ? { color: "red" } : {}}
          containerStyle={[style.inputContainer]}
        />

        <Input
          placeholder={t("PasswordPlaceholder")}
          value={password}
          onChangeText={(pass) => {
            setPassword(pass);
            updateError("Password");
          }}
          errorMessage={t(errors.Password)}
          errorStyle={errors.Password ? { color: "red" } : {}}
          containerStyle={[style.inputContainer]}
          secureTextEntry={isPasswordHidden}
          rightIcon={
            <Icon
              name={isPasswordHidden ? "eye" : "eye-off"}
              type="feather"
              activeOpacity={1}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            />
          }
        />

        <CButton title={t("Login")} buttonType="full" onPress={handleLogin} />
        <CButton
          title={t("NewUser")}
          buttonType="textOnly"
          onPress={handleNewUser}
        />
      </Card>
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    paddingTop: 25,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
});
