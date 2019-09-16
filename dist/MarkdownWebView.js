import React from "react";
import WebView from "react-native-webview-autoheight";
import makeMarkdown from "./makeMarkdown";

class MarkdownWebView extends React.Component {
    
    addKeyConcepts = (string) => {
        let exist = true;
        let result = string;
        while(exist) {
            const firsIndex = result.lastIndexOf("d[") + 2;
            const secondIndex = result.lastIndexOf("]d");
            if (firsIndex === 1 || secondIndex === -1) {
                exist = false;
            } else {
                var mySubString = result.substring(firsIndex, secondIndex);
                const stringData = mySubString.split('|')
                result = result.replace(
                    `d[${mySubString}]d`,
                    `
                        <div id="${stringData[0]}">
                            <p style="color:#007ad0">${stringData[1]}</p>
                            <div style="width:100%; height:1px; margin-top:5px; background-color:#ebebeb;"/>
                        </div>
                    `
                    );
            }
        }
        return result;
    }

    addBedside = (string) => {
        let exist = true;
        let result = string;
        while(exist) {
            const firsIndex = result.lastIndexOf("l[") + 2;
            const secondIndex = result.lastIndexOf("]l");

            if (firsIndex === 1 || secondIndex === -1) {
                exist = false;
            } else {
                exist = false;
                var mySubString = result.substring(firsIndex, secondIndex);
                const stringData = mySubString.split('|')
                result = result.replace(
                    `l[${mySubString}]l`,
                    `
                        <div style="width: 100%;">
                            <img style="width:100%; height:300px;" src="https:${stringData[0]}" />
                            <p style="color:#9d9d9d; font-size: 14px; text-align: center; margin-top: 10px;">${stringData[1]}</p>
                            <p
                                style="color:#333333; font-size: 18px; text-align: center; font-weight: 500; line-height:18px; margin-top: -10px; margin-left:15%; margin-right:15%;"
                            >
                                ${stringData[2]}
                            </p>
                            <div style="width:100%; height:1px; margin-top:5px; margin-bottom:5px; background-color:#ebebeb;"/>
                        </div>
                    `
                );
            }
        }
        return result;
    }

    addBodyStyles = (string) => {
        let exist = true;
        let result = string;
        while(exist) {
            const firsIndex = result.lastIndexOf("body[") + 5;
            const secondIndex = result.lastIndexOf("]body");
            if (firsIndex === 1 || secondIndex === -1) {
                exist = false;
            } else {
                var mySubString = result.substring(firsIndex, secondIndex);
                const stringData = mySubString.split('|')
                result = result.replace(
                    `body[${mySubString}]body`,
                    `
                        <div style="padding:20px;">
                           ${stringData}
                        </div>
                    `
                    );
            }
        }
        return result;
    }

    render() {
        const { content, highlight, innerRef } = this.props;
        let result = this.addKeyConcepts(
            makeMarkdown(content, highlight)
        );

        result = this.addBedside(result);
        result = this.addBodyStyles(result);
        result = result.replace(/###/g, "");
            
        return (
            <WebView
                ref={innerRef}
                source={{ html: result }}
                scrollEnabled={true}
                useWebKit={true}
                {...this.props}/>
            );
    }
}
export default React.forwardRef((props, ref) => (<MarkdownWebView innerRef={ref} {...props}/>));
