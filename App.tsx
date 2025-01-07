import { I18nextProvider } from "react-i18next";
import { i18n } from "@translation/i18n";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "@components/auth/Login";
import { useEffect, useState } from "react";
import { auth } from "@backend/firebase";
import { createTheme, ThemeProvider } from "@rneui/themed";
import AuthStack from "@components/stacks/AuthStacks";
import * as Font from "expo-font";
import Loader from "@customComponents/Loader";
import MainStacks from "@components/stacks/MainStacks";
import ToastManager from "toastify-react-native";

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = globalTheme;
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    const loadFonts = async () => {
      await Font.loadAsync({
        Helvetica: require("./assets/Helvetica.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
    setLoading(false);
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <ThemeProvider theme={theme}>
        <Loader isLoading={loading} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <I18nextProvider i18n={i18n}>
          {isAuthenticated ? <MainStacks /> : <AuthStack />}
        </I18nextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const globalTheme = createTheme({
  lightColors: {
    primary: "#90E0EF",
    secondary: "#CAF0F8",
    background: "#0077B6",
    black: "#000000",
    white: "#FFFFFF",
  },
  darkColors: {
    primary: "",
    secondary: "",
    background: "",
    black: "#000000",
    white: "#FFFFFF",
  },
  components: {
    Text: {
      style: {
        fontFamily: "Helvetica",
      },
    },
  },
});
