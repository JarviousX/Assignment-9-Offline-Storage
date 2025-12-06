import { View, Text, StyleSheet } from "react-native";

/**
 * University of Oklahoma Brand Colors
 * Consistent color scheme throughout the application
 */
const OU_CRIMSON = "#841617"; // Primary crimson color
const OU_CREAM = "#FDF9D8"; // University of Oklahoma Cream

/**
 * TabSettings Component
 * 
 * Settings screen for the application.
 * Styled with University of Oklahoma colors (Crimson and Cream)
 * to maintain brand consistency across all screens.
 */
export default function TabSettings() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Application Settings</Text>
        
        {/* Placeholder for future settings options */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.sectionText}>
            Settings options will be available here in a future update.
          </Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Stylesheet for the Settings screen
 * 
 * Uses University of Oklahoma brand colors:
 * - Crimson (#841617) for primary backgrounds
 * - Cream (#FDF9D8) for text and UI elements
 */
const styles = StyleSheet.create({
  // Main container with crimson background (OU brand color)
  container: {
    flex: 1,
    backgroundColor: OU_CRIMSON,
  },
  // Content container with padding
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  // Main title styling with cream color
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: OU_CREAM,
    marginBottom: 8,
  },
  // Subtitle styling
  subtitle: {
    fontSize: 18,
    color: OU_CREAM,
    opacity: 0.9,
    marginBottom: 40,
  },
  // Settings section container
  settingsSection: {
    width: "100%",
    backgroundColor: "rgba(253, 249, 216, 0.1)", // Semi-transparent cream
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  // Section title styling
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: OU_CREAM,
    marginBottom: 10,
  },
  // Section text styling
  sectionText: {
    fontSize: 14,
    color: OU_CREAM,
    opacity: 0.8,
    lineHeight: 20,
  },
});
