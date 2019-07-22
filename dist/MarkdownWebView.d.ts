/// <reference path="../src/@types/react-native-webview-autoheight/index.d.ts" />
import React from "react";
import WebView, { WebViewProps } from "react-native-webview-autoheight";
export interface IMarkdownWebViewProps extends WebViewProps {
    content: string;
    highlight?: boolean;
    innerRef?: React.Ref<WebView>;
}
declare const _default: React.ForwardRefExoticComponent<IMarkdownWebViewProps & React.RefAttributes<WebView>>;
export default _default;
