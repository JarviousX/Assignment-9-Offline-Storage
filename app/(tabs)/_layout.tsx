import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

/**
 * University of Oklahoma Brand Colors
 * Used consistently throughout the tab navigation UI
 */
const OU_CRIMSON = "#841617"; // Primary crimson color
const OU_CREAM = "#FDF9D8"; // University of Oklahoma Cream

/**
 * HeaderRightButton Component
 * 
 * This component renders the plus (+) button in the header that allows
 * users to create a new user record. Clicking it navigates to the modal
 * screen in create mode (without an ID parameter).
 */
function HeaderRightButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/modal")}
      style={{ marginRight: 10 }}
    >
      <FontAwesome name="plus-circle" size={28} color={OU_CRIMSON} />
    </TouchableOpacity>
  );
}

/**
 * TabLayout Component
 * 
 * Configures the bottom tab navigation for the application.
 * 
 * Features:
 * - Two tabs: Home and Settings
 * - OU brand colors applied to tab bar (cream background, crimson active tab)
 * - Header styling with OU colors (cream background, crimson text)
 * - Plus button in Home tab header for creating new users
 */
export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        // Tab bar styling with OU colors
        tabBarActiveTintColor: OU_CRIMSON, // Active tab icon/text color
        tabBarInactiveTintColor: "#666666", // Inactive tab color
        tabBarStyle: { backgroundColor: OU_CREAM }, // Cream background
        // Header styling with OU colors
        headerShown: true, // Show header on all tab screens
        headerStyle: { backgroundColor: OU_CREAM }, // Cream header background
        headerTintColor: OU_CRIMSON, // Crimson for header buttons/icons
        headerTitleStyle: { color: OU_CRIMSON }, // Crimson for header title
      }}
    >
      {/* Home Tab: Main screen displaying user list */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => <HeaderRightButton />, // Plus button for creating users
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      {/* Settings Tab: Placeholder for future settings functionality */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
