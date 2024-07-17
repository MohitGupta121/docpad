# DocPad Mobile App

## Description

Docpad 📱 is a mobile application designed for hospitals and medical organizations, primarily used on iPads. 🏥 It allows each institution or department to efficiently manage patient records 📋, track visits 🏃, and handle medical prescriptions 💊. Doctors can easily maintain and access all related information, ensuring streamlined and organized healthcare management. With Docpad, healthcare professionals can provide better patient care through improved data accessibility and organization. 🌟

## Demo 



https://github.com/user-attachments/assets/1144cc49-0d1d-4fc6-8472-3e152949fc7a




## Prerequisites

Make sure you have installed all the following prerequisites on your development machine:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) v20.9.0

  To update node to latest stable version run

  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  nvm ls-remote
  nvm install <version>
  nvm use <version>
  ```

- Watchman - [Download & install Watchman](https://facebook.github.io/watchman/docs/install) v2023.11.06.00
- Yarn - [Download & install Yarn](https://yarnpkg.com/getting-started/install) v4.0.2
- Java - [Download & install JDK](https://www.oracle.com/java/technologies/downloads/) v21.0.1
  (Select `ARM64 DMG Installer` for macOS for macs with Apple Silicon,
  Select `x64 DMG Installer` for macOS for macs with intel)
- Xcode - [Download & install Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) v15.0
- Xcode Command Line Tools - run `xcode-select --install` v15.0
- CocoaPods - [Download & install CocoaPods](https://cocoapods.org/) (use `brew install cocoapods ` for macs with
  intel) v1.14
- applesimutils - For testing. Execute commands;

  ```
  brew tap wix/brew
  brew install applesimutils
  ```

---

## Before You Start The Application

### Install the used simulator in Xcode

Open Xcode and navigate to `Window > Devices and Simulators`. Go to the **Simulators** tab and click on the "+" in
the bottom left corner. In the selection for **Device Type** select `iPad Air (5th generation)` and click "Create".

### Download and install all dependencies

In the `/frontend` directory execute the following commands:

```
yarn install
cd ios && pod install && cd ..
```

### Initialize Husky before Committing anything

Initialize husky so the pre-commit hook runs before ever commit

```
yarn prepare
```

### Create .env file

Create a copy of `.env.development` as `.env` in the base project directory (same path as .env.development).

### Generate API

Copy the yaml file you get from swagger ui to `/frontend/src/docpad-api/spec.yaml`

Run

```
yarn api
```

### Open workspace in Xcode

Open this file in Xcode: `/DocPad/frontend/ios/docpad.xcworkspace`

---

## Running The App

### Step 1: Start Metro

First, you will need to start Metro, the JavaScript bundler that ships with React Native. To start Metro, run the
following command inside the `/frontend` directory:

```
yarn start
```

### Step 2: Start your application

Let the Metro Bundler run in its own terminal. Open a new terminal inside the `/frontend` directory. Run the
following:

```
yarn ios
```

---

## Testing

### e2e Tests

Go to the `/frontend` directory. Make sure you have Metro running with

```
yarn start
```

#### For release:

```
yarn test:build:release
yarn test:run:release
```

#### For debug:

```
yarn test:build:debug
yarn test:run:debug
```

### Unit Tests

In the `/frontend` directory run:

```
yarn test:unit:run
```

## License

This project includes software from several third-party libraries:

- [HighLine](https://github.com/JEG2/highline) - Dual licensed under [GPL Version 2](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html) or the [Ruby License](https://www.ruby-lang.org/en/about/license.txt). We use the Ruby License.
- [Node-forge](https://github.com/digitalbazaar/forge) - Dual licensed under [GPL Version 2](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html) or the [BSD 3 Clause](https://opensource.org/license/bsd-3-clause) License. We use the BSD 3 Clause License.
- [NKF](https://github.com/ruby/nkf) - Licensed under [Ruby License](https://www.ruby-lang.org/en/about/license.txt).
- [JSC-Android-Buildscripts](https://github.com/react-native-community/jsc-android-buildscripts) - Licensed under the [BSD 2 Clause](https://opensource.org/license/bsd-2-clause) License.

The full license texts for these libraries can be found in the `licenses` directory.
