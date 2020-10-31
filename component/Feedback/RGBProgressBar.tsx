import {LinearProgress, withStyles, LinearProgressProps} from "@material-ui/core";
import React from "react";

interface ComponentProps extends LinearProgressProps{
    hue: string;
}

const RGBProgressBar = withStyles({
    colorPrimary: {
        // @ts-ignore
        backgroundColor: (props: ComponentProps) => (`rgba(${props.hue}, 0.3)`)
    },
    barColorPrimary:  {
        // @ts-ignore
        backgroundColor: (props: ComponentProps) => (`rgba(${props.hue}, 1)`)
    }
})(LinearProgress);


export default RGBProgressBar