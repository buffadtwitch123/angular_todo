# angular todo list app
## How to setup:<br>
download node JS from [Node.js](https://nodejs.org/en)

### open cmd in angular-app folder
install angular
```bash
  npm install -g @angular/cli@19.1.6
```

### npm install to install all the dependencies listed in the package.json file of a Node.js project.
```bash
  npm install
```

### The command npm install @angular/fire firebase installs two packages:<br><br>
-fire: This is the official Angular library for Firebase. It provides AngularFire, which is a set of Angular bindings for Firebase.<br> It simplifies the integration of Firebase services such as Firestore, Authentication, and Storage with Angular applications.<br><br>
-firebase: This is the Firebase JavaScript SDK. It provides the core Firebase services and APIs that you can use to interact with Firebase from your web application.<br><br>
Running this command will add both packages to your project's dependencies and install them in the node_modules directory.
```bash
  npm install @angular/fire firebase
```

### To start a local development server, run:
```bash
  ng serve
```

### Once the server is running, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload whenever you modify any of the source files.
