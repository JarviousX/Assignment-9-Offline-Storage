import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

/**
 * Database Initialization Function
 * 
 * This function is called when the SQLite database is first initialized.
 * It creates the 'users' table if it doesn't already exist.
 * 
 * Table Schema:
 * - id: INTEGER PRIMARY KEY AUTOINCREMENT (unique identifier)
 * - name: TEXT (user's name)
 * - email: TEXT (user's email address)
 * - image: TEXT (placeholder for future image functionality)
 * 
 * @param db - The SQLite database instance
 */
const createDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log("Creating database");
  try {
    // Create the users table if it doesn't exist
    // Uses IF NOT EXISTS to prevent errors on subsequent app launches
    const response = await db.execAsync(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, image TEXT)"
    );
    console.log("Database created", response);
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

/**
 * RootLayout Component
 * 
 * This is the root component of the application that:
 * 1. Initializes the SQLite database provider
 * 2. Sets up the navigation stack with tabs and modal screens
 * 3. Configures the status bar
 * 
 * The SQLiteProvider wraps the entire app, making the database context
 * available to all child components via useSQLiteContext() hook.
 */
export default function RootLayout() {
  return (
    <>
      {/* SQLite Provider: Makes database available throughout the app */}
      <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
        <Stack>
          {/* Tab navigation screens (header handled within tabs) */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* 404 Not Found screen */}
          <Stack.Screen name="+not-found" />
          {/* Modal screen for creating/editing users */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}
