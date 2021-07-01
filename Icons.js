const LoadingIcon = react.createElement("svg", {
    style: { "margin": "0 auto", "display": "block"},
    width: "200px", height: "200px", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid"
}, react.createElement("circle", {
    cx: "50", cy: "50", r: "0", fill: "none", stroke: "currentColor", "stroke-width": "2"
}, react.createElement("animate", {
    attributeName: "r", repeatCount: "indefinite", dur: "1s", values: "0;40", keyTimes: "0;1", keySplines: "0 0.2 0.8 1", calcMode: "spline", begin: "0s"
}), react.createElement("animate", {
    attributeName: "opacity", repeatCount: "indefinite", dur: "1s", values: "1;0", keyTimes: "0;1", keySplines: "0.2 0 0.8 1", calcMode: "spline", begin: "0s"
})), react.createElement("circle", {
    cx: "50", cy: "50", r: "0", fill: "none", stroke: "currentColor", "stroke-width": "2"
}, react.createElement("animate", {
    attributeName: "r", repeatCount: "indefinite", dur: "1s", values: "0;40", keyTimes: "0;1", keySplines: "0 0.2 0.8 1", calcMode: "spline", begin: "-0.5s"
}), react.createElement("animate", {
    attributeName: "opacity", repeatCount: "indefinite", dur: "1s", values: "1;0", keyTimes: "0;1", keySplines: "0.2 0 0.8 1", calcMode: "spline", begin: "-0.5s"
})));

const PopularityIcon = react.createElement("svg", {
    viewBox: "0 0 384 512",
    fill: "currentColor",
    style: {
        display: "inline-block",
        fontSize: "inherit",
        height: "1em",
        overflow: "visible",
        verticalAlign: "-0.125em"}
    }, react.createElement("path", {
    d: "M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"
}))

