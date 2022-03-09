// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tomato-clock" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("tomato-clock.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from tomato-clock!");
  });

  let start = vscode.commands.registerCommand("tomato-clock.start", () => {
    vscode.window.showInformationMessage("tomato-clock.start start!");
  });

  let stop = vscode.commands.registerCommand("tomato-clock.stop", () => {
    vscode.window.showInformationMessage("tomato-clock stop!");
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(start);
  context.subscriptions.push(stop);
}

// this method is called when your extension is deactivated
export function deactivate() {}
