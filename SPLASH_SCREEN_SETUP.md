# Splash Screen & App Icon Setup

## Splash Screen Implementation

The splash screen has been implemented using `react-native-splash-screen`.

### Android Setup ✅
- Created `launch_screen.xml` layout
- Added splash screen theme in `styles.xml`
- Updated `MainActivity.kt` to show splash screen
- Updated `AndroidManifest.xml` to use splash theme
- Splash image copied to `android/app/src/main/res/drawable/splash.png`

### iOS Setup ✅
- Updated `LaunchScreen.storyboard` with logo image
- Splash image added to `ios/toryos/Images.xcassets/Splash.imageset/`
- Background color set to `#1A1A2E` (dark navy blue)

### React Native Integration ✅
- `App.tsx` updated to hide splash screen after 2 seconds
- Uses `react-native-splash-screen` library

## App Icon Update Instructions

### For Android:
1. Generate app icons in multiple sizes:
   - `mipmap-mdpi`: 48x48px
   - `mipmap-hdpi`: 72x72px
   - `mipmap-xhdpi`: 96x96px
   - `mipmap-xxhdpi`: 144x144px
   - `mipmap-xxxhdpi`: 192x192px

2. Replace icons in:
   - `android/app/src/main/res/mipmap-*/ic_launcher.png`
   - `android/app/src/main/res/mipmap-*/ic_launcher_round.png` (for round icons)

3. You can use online tools like:
   - https://www.appicon.co/
   - https://icon.kitchen/
   - https://makeappicon.com/

### For iOS:
1. Generate app icons using Xcode:
   - Open `ios/toryos.xcworkspace` in Xcode
   - Select the project → `toryos` target → `General` tab
   - Under `App Icons and Launch Screen`, drag your icon images
   - Or use `ios/toryos/Images.xcassets/AppIcon.appiconset/`

2. Required sizes:
   - 20x20pt (@2x, @3x)
   - 29x29pt (@2x, @3x)
   - 40x40pt (@2x, @3x)
   - 60x60pt (@2x, @3x)
   - 1024x1024pt (App Store)

3. You can also use online tools mentioned above for Android

### Quick Icon Generation:
Use the logo from `src/assets/images/logo.png` and generate all required sizes using any of the online tools mentioned above.

## Testing

1. **Android:**
   ```bash
   npm run android
   ```

2. **iOS:**
   ```bash
   npm run ios
   ```

The splash screen should appear for 2 seconds when the app launches.

