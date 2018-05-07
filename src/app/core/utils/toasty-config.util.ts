import { ToastOptions, ToastData } from "ng2-toasty";

export class ToastyConfigUtils {
    static toastOptions: ToastOptions = {
        title: "",
        msg: "",
        showClose: true,
        timeout: 5000,
        theme: 'material'
    };

    public static getConfig(message: string, title: string): ToastOptions {
        let customOptions: ToastOptions = this.toastOptions;
        customOptions.title = title;
        customOptions.msg = message;
        return customOptions;
    }
}