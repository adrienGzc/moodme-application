import React from "react";
import { Platform, Pressable } from "react-native";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { DashboardScreen, ProfileScreen, InterventionScreen } from "Views";
import AdamHeaderTitle from "Components/AdamHeaderTitle";
import { colors, spacing } from "Assets/styles/global";

type HomeStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Intervention: { idIntervention: string };
};

type OptionProps = {
  navigation: StackNavigationProp<HomeStackParamList, "Dashboard">;
};

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator<HomeStackParamList>();

  return (
    <HomeStack.Navigator initialRouteName="Dashboard">
      <HomeStack.Screen
        component={DashboardScreen}
        name="Dashboard"
        options={({ navigation }: OptionProps) => ({
          headerStyle: Platform.select({
            ios: { height: 160 },
            android: { height: 130 },
          }),
          headerTitle: () => <AdamHeaderTitle />,
          headerTitleAlign: "left",
          headerTitleAllowFontScaling: false,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <FontAwesomeIcon color="black" icon={faUserCircle} size={35} />
            </Pressable>
          ),
          headerTitleContainerStyle: {
            height: "100%",
            justifyContent: "flex-end",
            ...spacing.pgb2,
          },
          headerRightContainerStyle: {
            height: "100%",
            justifyContent: "flex-end",
            ...spacing.mgr2,
            ...spacing.pgb2_5,
          },
        })}
      />
      <HomeStack.Screen
        component={ProfileScreen}
        name="Profile"
        options={() => ({
          headerStyle: {
            backgroundColor: colors.adamHeader,
          },
          headerBackTitle: "Retour",
          headerTitle: "Votre compte",
          headerTitleAlign: "center",
        })}
      />
      <HomeStack.Screen
        component={InterventionScreen}
        name="Intervention"
        options={() => ({
          headerStyle: {
            backgroundColor: colors.adamHeader,
          },
          headerBackTitle: "Retour",
          headerTitleAlign: "center",
        })}
      />
    </HomeStack.Navigator>
  );
};

export type { HomeStackParamList };
export default HomeStackNavigator;
