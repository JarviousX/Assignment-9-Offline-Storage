# Expo Router Example - Tabs, Modal and SQLite

Use [`expo-router`](https://docs.expo.dev/router/introduction/) to build native navigation using files in the `app/` directory.

## 📚 Inspiration & Credits

This project was inspired by and built following the tutorial from **Aaron K. Saunders** (@aaronksaunders). The original codebase and implementation approach were based on his excellent work demonstrating React Native Expo offline data storage with SQLite.

- **Original Creator**: Aaron K. Saunders (@aaronksaunders)
- **Original Repository**: [my-app-sqlite-no-template](https://github.com/aaronksaunders/my-app-sqlite-no-template)
- **Tutorial Video**: [React Native Expo: Offline Data Storage with SQLite](https://youtu.be/vgPdAARd6Gw?si=zW5WAuDE7af2wgTt)

## ✨ Changes & Customizations

This project extends the original implementation with the following modifications:

### UI/UX Enhancements
- **Custom Color Scheme**: Styled with University of Oklahoma colors
  - Crimson (#841617) for primary backgrounds and accents
  - Cream (#FDF9D8) for headers, navigation bars, and UI elements
- **Enhanced Header**: Added cream-colored header bar with crimson text and plus button
- **Styled Navigation**: Customized bottom tab bar with OU colors
- **Improved Button Design**: Edit and Delete buttons styled with OU color scheme

### Functionality Additions
- **Delete Functionality**: Added complete delete operation for SQLite records
- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Enhanced User Experience**: Improved button layouts and visual hierarchy

### Technical Updates
- **SDK Upgrade**: Upgraded from Expo SDK 52 to SDK 54 for compatibility
- **Dependency Updates**: Updated all packages to latest compatible versions
- **Code Organization**: Improved component structure and styling consistency

## VIDEO WALKTHROUGH
- https://youtu.be/vgPdAARd6Gw?si=zW5WAuDE7af2wgTt

## 🚀 How to use

```sh
npx create-expo-app@latest -e with-router
```

## Links

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)
- [Expo Router Tabs: Docs](https://docs.expo.dev/router/advanced/tabs/)
- [Expo Router Modal: Docs](https://docs.expo.dev/router/advanced/modals/)
- [Expo SQLite: Docs](https://docs.expo.dev/versions/latest/sdk/sqlite/)
