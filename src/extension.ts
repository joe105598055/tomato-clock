// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { start, close } from "./clock";

let status: vscode.StatusBarItem;

enum Command {
  OPEN = "tomato-clock.open",
  STOP = "tomato-clock.stop",
  STATUS_BAR_CLICK = "tomato-clock.statusBarClick",
}
function createStatusBarItem(context: vscode.ExtensionContext) {
  // register a command that is invoked when the status bar, item is clicked.
  context.subscriptions.push(
    vscode.commands.registerCommand(Command.STATUS_BAR_CLICK, async () => {
      vscode.window
        .showQuickPick(["Restart", "Close"], {
          placeHolder: "Select action what you want",
        })
        .then((select) => {
          if (select === "Close") {
            close(status);
          }
          if (select === "Restart") {
            vscode.window
              .showInformationMessage("Choose process perid: ", "20 min", "25 min", "30 min")
              .then((select: string | undefined) => {
                switch (select) {
                  case "20 min":
                    start(20, status);
                    break;
                  case "25 min":
                    start(25, status);
                    break;
                  case "30 min":
                    start(30, status);
                    break;
                }
              });
          }
        });
    })
  );

  // create a new status bar item that we can now manage
  status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 200);
  status.command = Command.STATUS_BAR_CLICK;

  context.subscriptions.push(status);
  // item.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
  status.tooltip = `Select action what you want`;
  status.show();
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  createStatusBarItem(context);
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

  const open = vscode.commands.registerCommand(Command.OPEN, () => {
    vscode.window
      .showInformationMessage("Choose process perid: ", "20 min", "25 min", "30 min")
      .then((select: string | undefined) => {
        switch (select) {
          case "20 min":
            start(20, status);
            break;
          case "25 min":
            start(25, status);
            break;
          case "30 min":
            start(30, status);
            break;
        }
      });
  });

  let stop = vscode.commands.registerCommand("tomato-clock.stop", () => {
    vscode.window.showInformationMessage("tomato-clock stop!");
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(open);
  context.subscriptions.push(stop);
}

// this method is called when your extension is deactivated
export function deactivate() {
  close(status);
}
