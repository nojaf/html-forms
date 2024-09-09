// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Core__Int from "@rescript/core/src/Core__Int.res.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.res.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function textTypeAsString(tt) {
  return tt;
}

function make(props) {
  let inputProps = Core__Option.getOr(props.inputProps, {});
  let labelText = props.labelText;
  let textProps = props.formValue;
  let tmp;
  switch (textProps.TAG) {
    case "Text" :
      let onChange = textProps.onChange;
      let value = textProps.value;
      let match = textProps.type_;
      let exit = 0;
      if (match === "Textarea") {
        let newrecord = Caml_obj.obj_dup(inputProps);
        tmp = JsxRuntime.jsx("textarea", (newrecord.onChange = ev => {
          let target = ev.target;
          onChange(target.value);
        }, newrecord.value = value, newrecord.name = props.id, newrecord.id = props.id, newrecord));
      } else {
        exit = 1;
      }
      if (exit === 1) {
        let type_ = Core__Option.getOr(Core__Option.map(textProps.type_, textTypeAsString), "text");
        let newrecord$1 = Caml_obj.obj_dup(inputProps);
        tmp = JsxRuntime.jsx("input", (newrecord$1.onChange = ev => {
          let target = ev.target;
          onChange(target.value);
        }, newrecord$1.value = value, newrecord$1.type = type_, newrecord$1.name = props.id, newrecord$1.id = props.id, newrecord$1));
      }
      break;
    case "Int" :
      let onChange$1 = textProps.onChange;
      let newrecord$2 = Caml_obj.obj_dup(inputProps);
      tmp = JsxRuntime.jsx("input", (newrecord$2.onChange = ev => {
        let target = ev.target;
        Core__Option.forEach(Core__Int.fromString(target.value, undefined), onChange$1);
      }, newrecord$2.value = textProps.value.toString(), newrecord$2.type = "number", newrecord$2.name = props.id, newrecord$2.id = props.id, newrecord$2));
      break;
    case "Boolean" :
      let onChange$2 = textProps.onChange;
      tmp = JsxRuntime.jsxs("label", {
        children: [
          JsxRuntime.jsx("input", {
            id: props.id,
            checked: textProps.value,
            type: "checkbox",
            onChange: ev => {
              let target = ev.target;
              onChange$2(target.checked);
            }
          }),
          JsxRuntime.jsx("span", {})
        ]
      });
      break;
    case "Choice" :
      let onChange$3 = textProps.onChange;
      let value$1 = textProps.value;
      let onChange$4 = ev => {
        let target = ev.target;
        if (target.checked) {
          return onChange$3(target.value);
        }
        
      };
      tmp = JsxRuntime.jsx("div", {
        children: textProps.items.map((param, idx) => {
          let v = param.value;
          let id = props.id + "-" + idx.toString();
          let newrecord = Caml_obj.obj_dup(inputProps);
          return JsxRuntime.jsxs("label", {
            children: [
              param.label,
              JsxRuntime.jsx("input", (newrecord.onChange = onChange$4, newrecord.value = v, newrecord.type = "radio", newrecord.name = props.id, newrecord.checked = value$1 === v, newrecord.id = id, newrecord))
            ],
            htmlFor: id
          }, id);
        }),
        className: "choice"
      });
      break;
  }
  return JsxRuntime.jsxs("div", {
    children: [
      labelText !== undefined ? JsxRuntime.jsx("label", {
          children: labelText,
          htmlFor: props.id
        }) : null,
      tmp
    ],
    className: "form-control"
  });
}

let FormControl = {
  make: make
};

export {
  textTypeAsString,
  FormControl,
}
/* react/jsx-runtime Not a pure module */
