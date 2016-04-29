import React from "react";
import ReactCSS from "reactcss";
import TextListItem from "./TextListItem";
import { StructuralColors } from "../shared/colors";

export default class SelectInput extends ReactCSS.Component {
  displayName = "SelectInput";

  classes() {
    return {
      default: {
        SelectInput: {
          border: `1px solid ${StructuralColors.divider}`,
        },
      },
    };
  }

  render() {
    return (
      <div style={this.styles().SelectInput}>
        <TextListItem
          ref={c => this.displayRef = c}
          text={"--"}
        />
      </div>
    );
  }
}
