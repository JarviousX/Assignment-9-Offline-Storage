import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";

/**
 * University of Oklahoma Brand Colors
 * These colors are used throughout the application to maintain brand consistency
 */
const OU_CRIMSON = "#841617"; // Primary crimson color for backgrounds
const OU_CREAM = "#FDF9D8"; // University of Oklahoma Cream for headers and UI elements

/**
 * TabHome Component
 * 
 * This is the main home screen that displays a list of users stored in SQLite.
 * It implements full CRUD operations:
 * - READ: Displays all users from the database
 * - UPDATE: Navigates to modal for editing (via Edit button)
 * - DELETE: Removes a user from the database
 * 
 * The component automatically refreshes the data when the screen comes into focus,
 * ensuring the list is always up-to-date.
 */
export default function TabHome() {
  // State to hold the list of users fetched from SQLite database
  const [data, setData] = React.useState<
    { id: number; name: string; email: string }[]
  >([]);
  
  // Access the SQLite database context provided by SQLiteProvider
  const database = useSQLiteContext();
  
  /**
   * useFocusEffect hook ensures data is refreshed whenever the screen comes into focus.
   * This is important because after navigating back from the modal (after save/update),
   * we want to see the latest data without manual refresh.
   */
  useFocusEffect(
    useCallback(() => {
      loadData(); // Fetch data when the screen is focused
    }, [])
  );

  /**
   * READ Operation: Load all users from SQLite database
   * 
   * This function queries the SQLite database to retrieve all user records
   * and updates the component state with the results. The UI automatically
   * re-renders when the state changes, displaying the updated list.
   */
  const loadData = async () => {
    const result = await database.getAllAsync<{
      id: number;
      name: string;
      email: string;
    }>("SELECT * FROM users");
    setData(result);
  };

  /**
   * DELETE Operation: Remove a user from SQLite database
   * 
   * @param id - The unique identifier of the user record to delete
   * 
   * This function permanently removes a user record from the SQLite database
   * based on the provided ID. After successful deletion, it automatically
   * reloads the data to reflect the change in the UI immediately.
   */
  const handleDelete = async (id: number) => {
    try {
      // Execute DELETE SQL query with parameterized query to prevent SQL injection
      await database.runAsync("DELETE FROM users WHERE id = ?", [id]);
      console.log("Item deleted successfully");
      loadData(); // Reload data after deletion to update UI immediately
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {/* 
          FlatList efficiently renders the list of users.
          Each item displays the user's name and email, along with
          Edit and Delete action buttons.
        */}
        <FlatList
          data={data}
          renderItem={({
            item,
          }: {
            item: { id: number; name: string; email: string };
          }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemContent}>
                {/* User information display */}
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.emailText}>{item.email}</Text>
                </View>
                {/* Action buttons container */}
                <View style={styles.buttonContainer}>
                  {/* 
                    Edit Button: Navigates to modal screen with the user's ID
                    to pre-populate the form for editing (UPDATE operation)
                  */}
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/modal?id=${item.id}`);
                    }}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  {/* 
                    Delete Button: Immediately deletes the user record
                    from the SQLite database (DELETE operation)
                  */}
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

/**
 * Stylesheet for the Home screen
 * 
 * All styles use University of Oklahoma brand colors:
 * - Crimson (#841617) for primary backgrounds
 * - Cream (#FDF9D8) for text and UI elements
 */
const styles = StyleSheet.create({
  // Main container with crimson background (OU brand color)
  container: {
    flex: 1,
    backgroundColor: OU_CRIMSON,
  },
  // Container for the scrollable list
  listContainer: {
    flex: 1,
  },
  // Individual user item container with subtle border separator
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  // Horizontal layout for user info and action buttons
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // Container for user name and email text
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  // User name styling with cream color for visibility on crimson background
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: OU_CREAM,
    marginBottom: 4,
  },
  // User email styling with slight opacity for visual hierarchy
  emailText: {
    fontSize: 14,
    color: OU_CREAM,
    opacity: 0.95,
  },
  // Container for Edit and Delete buttons
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  // Edit button: Cream background with crimson text (OU color scheme)
  editButton: {
    height: 35,
    minWidth: 60,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: OU_CREAM,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: OU_CRIMSON,
  },
  // Delete button: Crimson background with cream border and text
  deleteButton: {
    height: 35,
    minWidth: 60,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: OU_CRIMSON,
    borderWidth: 1,
    borderColor: OU_CREAM,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: OU_CREAM,
  },
});
