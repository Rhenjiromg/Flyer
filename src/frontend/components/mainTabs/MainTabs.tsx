import CButton from "@customComponents/Button";
import CText from "@customComponents/Text";
import UnderDevelopment from "@customComponents/Underdevelopment";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { Icon, Input, SearchBar } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

function MainTabs() {
  const theme = useTheme();
  const style = tabStyles;
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconName = "";
          switch (route.name) {
            case "Home":
              IconName = "home";
              break;
            case "Search":
              IconName = "find";
              break;
            case "Profile":
              IconName = "smileo";
            default:
              break;
          }

          return (
            <Icon name={IconName} type="antdesign" size={size} color={color} />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={UnderDevelopment}
        options={{
          headerTitle: () => (
            <CText md semibold>
              {t("HomeTitle")}
            </CText>
          ),
          headerRight: () => (
            <CButton
              title={<Icon type="antdesign" name="plus" />}
              buttonType="textOnly"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={UnderDevelopment}
        options={{
          headerTitle: () => <Input />,
          headerRight: () => (
            <CButton
              title={<Icon type="antdesign" name="plus" />}
              buttonType="textOnly"
            />
          ),
          headerTitleContainerStyle: { width: "100%", padding: 10 },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UnderDevelopment}
        options={{
          headerTitle: () => (
            <CText md semibold>
              {t("ProfileTitle")}
            </CText>
          ),
          headerRight: () => (
            <CButton
              title={<Icon type="antdesign" name="bars" />}
              buttonType="textOnly"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    height: "30%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    paddingLeft: 30,
    paddingRight: 20,
  },
  headeButton: {
    alignSelf: "flex-end",
    width: "200%",
  },
});

export default MainTabs;
