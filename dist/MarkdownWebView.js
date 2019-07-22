import React from "react";
import WebView from "react-native-webview-autoheight";
import makeMarkdown from "./makeMarkdown";

class MarkdownWebView extends React.Component {
    
    addPaging = (string) => {
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

    render() {
        const { content, highlight, innerRef } = this.props;
        let result = this.addPaging(
            makeMarkdown(content, highlight)
        )
            
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
