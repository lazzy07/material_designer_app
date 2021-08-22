import { remote, MessageBoxOptions, MessageBoxReturnValue } from "electron";

export const showDialogBox = (
  options: MessageBoxOptions,
  pinWindow: boolean = false
): Promise<MessageBoxReturnValue> => {
  return new Promise(async (resolve, reject) => {
    try {
      let res: MessageBoxReturnValue;

      if (pinWindow) {
        res = await remote.dialog.showMessageBox(
          remote.BrowserWindow.getFocusedWindow()!,
          options
        );
      } else {
        res = await remote.dialog.showMessageBox(options);
      }
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
