import * as vscode from "vscode";
const format = require("date-fns/format");
let clock: NodeJS.Timeout;

export function close(status: vscode.StatusBarItem) {
  clock && clearInterval(clock as NodeJS.Timeout);
  status.text = "";
  status.hide();
}

export function start(time: number, status: vscode.StatusBarItem) {
  clock && clearInterval(clock as NodeJS.Timeout);
  status.show();
  time = time * 60 * 1000;
  clock = setInterval(() => {
    time = time - 1000;
    status.text = "🍅 ** work ** " + String(format(time, "mm:ss"));
    if (time === 0) {
      clearInterval(clock as NodeJS.Timeout);
      vscode.window
        .showInformationMessage("Take a break.", "5 min", "10 min")
        .then((select: string | undefined) => {
          switch (select) {
            case "5 min":
              rest(5, status);
              break;
            case "10 min":
              rest(10, status);
              break;
          }
        });
    }
  }, 1000);
}

function rest(time: number, status: vscode.StatusBarItem) {
  clock && clearInterval(clock as NodeJS.Timeout);
  time = time * 60 * 1000;
  status.show();
  clock = setInterval(() => {
    time = time - 1000;
    status.text = "🍅 **  break ** " + String(format(time, "mm:ss"));
    if (time === 0) {
      clearInterval(clock as NodeJS.Timeout);
      vscode.window
        .showInformationMessage("Start working.", "20 min", "25 min", "30 min")
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
  }, 1000);
}
