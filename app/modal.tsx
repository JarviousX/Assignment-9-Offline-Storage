import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  InteractionManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * University of Oklahoma Brand Colors
 * Consistent color scheme throughout the application
 */
const OU_CRIMSON = "#841617"; // Primary crimson color
const OU_CREAM = "#FDF9D8"; // University of Oklahoma Cream

/**
 * ItemModal Component
 * 
 * This modal screen handles both CREATE and UPDATE operations for user records.
 * 
 * Functionality:
 * - CREATE: When opened without an ID, allows creating a new user (SAVE operation)
 * - UPDATE: When opened with an ID parameter, loads existing data and allows editing (UPDATE operation)
 * 
 * The component automatically detects edit mode based on the presence of an ID parameter
 * in the URL query string.
 */
export default function ItemModal() {
  // Extract the user ID from the URL parameters (if present)
  const { id } = useLocalSearchParams();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Track whether we're in edit mode (true) or create mode (false)
  const [editMode, setEditMode] = useState(false);

  // Access the SQLite database context
  const database = useSQLiteContext();

  /**
   * useEffect hook: Determines if we're in edit mode and loads existing data
   * 
   * If an ID is present in the URL, we're editing an existing record.
   * In this case, we set editMode to true and load the user's data.
   */
  React.useEffect(() => {
    if (id) {
      // If ID is present, we're in edit mode
      setEditMode(true);
      loadData();
    }
  }, [id]);

  /**
   * READ Operation: Load a specific user's data for editing
   * 
   * This function queries the SQLite database to retrieve a single user record
   * by ID and populates the form fields with the existing data.
   */
  const loadData = async () => {
    const result = await database.getFirstAsync<{
      id: number;
      name: string;
      email: string;
    }>(`SELECT * FROM users WHERE id = ?`, [parseInt(id as string)]);
    setName(result?.name!);
    setEmail(result?.email!);
  };

  /**
   * CREATE Operation: Save a new user to SQLite database
   * 
   * This function inserts a new user record into the SQLite database.
   * After successful insertion, it navigates back to the home screen,
   * which will automatically refresh and display the new record.
   */
  const handleSave = async () => {
    // Validate input fields
    if (!name.trim() || !email.trim()) {
      console.error("Name and email are required");
      return;
    }

    try {
      // Execute INSERT SQL query with parameterized values to prevent SQL injection
      const response = await database.runAsync(
        `INSERT INTO users (name, email, image) VALUES (?, ?, ?)`,
        [name.trim(), email.trim(), ""]
      );
      
      console.log("Item saved successfully:", response?.changes!);
      
      // Wait for all interactions to complete before navigating
      // This ensures the database operation is fully committed
      InteractionManager.runAfterInteractions(() => {
        router.back();
      });
    } catch (error) {
      console.error("Error saving item:", error);
      // Don't navigate if there's an error
    }
  };

  /**
   * UPDATE Operation: Modify an existing user record in SQLite database
   * 
   * This function updates an existing user record in the SQLite database
   * based on the ID. After successful update, it navigates back to the home screen,
   * which will automatically refresh and display the updated record.
   */
  const handleUpdate = async () => {
    // Validate input fields
    if (!name.trim() || !email.trim()) {
      console.error("Name and email are required");
      return;
    }

    try {
      // Execute UPDATE SQL query with parameterized values
      const response = await database.runAsync(
        `UPDATE users SET name = ?, email = ? WHERE id = ?`,
        [name.trim(), email.trim(), parseInt(id as string)]
      );
      
      console.log("Item updated successfully:", response?.changes!);
      
      // Wait for all interactions to complete before navigating
      // This ensures the database operation is fully committed
      InteractionManager.runAfterInteractions(() => {
        router.back();
      });
    } catch (error) {
      console.error("Error updating item:", error);
      // Don't navigate if there's an error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal header with OU cream background and crimson text */}
      <Stack.Screen 
        options={{ 
          title: "Item Modal",
          headerStyle: { backgroundColor: OU_CREAM },
          headerTintColor: OU_CRIMSON,
          headerTitleStyle: { color: OU_CRIMSON }
        }} 
      />
      {/* Form inputs container */}
      <View
        style={{
          gap: 20,
          marginVertical: 20,
        }}
      >
        {/* Name input field */}
        <TextInput
          placeholder="Name"
          placeholderTextColor="rgba(132, 22, 23, 0.5)"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        {/* Email input field with email keyboard type */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(132, 22, 23, 0.5)"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
      </View>
      {/* Action buttons container */}
      <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
        {/* Cancel button: Discards changes and returns to home screen */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        {/* 
          Save/Update button: 
          - In create mode: Calls handleSave() to INSERT new record
          - In edit mode: Calls handleUpdate() to UPDATE existing record
        */}
        <TouchableOpacity
          onPress={async () => {
            editMode ? handleUpdate() : handleSave();
          }}
          style={[styles.button, styles.saveButton]}
        >
          <Text style={styles.saveButtonText}>{editMode ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/**
 * Stylesheet for the Modal screen
 * 
 * Uses University of Oklahoma brand colors consistently:
 * - Crimson background for main container
 * - Cream inputs and buttons for visual contrast
 */
const styles = StyleSheet.create({
  // Main container with crimson background (OU brand color)
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: OU_CRIMSON,
  },
  // Text input styling: Cream background with crimson text for readability
  textInput: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 5,
    borderColor: OU_CREAM,
    backgroundColor: OU_CREAM,
    color: OU_CRIMSON,
  },
  // Base button styling
  button: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  // Cancel button: Cream background with crimson border and text
  cancelButton: {
    backgroundColor: OU_CREAM,
    borderWidth: 1,
    borderColor: OU_CRIMSON,
  },
  cancelButtonText: {
    fontWeight: "bold",
    color: OU_CRIMSON,
  },
  // Save/Update button: Crimson background with cream border and text
  saveButton: {
    backgroundColor: OU_CRIMSON,
    borderWidth: 1,
    borderColor: OU_CREAM,
  },
  saveButtonText: {
    fontWeight: "bold",
    color: OU_CREAM,
  },
});
