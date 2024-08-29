// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Core__Int from "@rescript/core/src/Core__Int.res.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.res.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function make(props) {
  let inputProps = Core__Option.getOr(props.inputProps, {});
  let labelText = props.labelText;
  let match = props.formValue;
  let tmp;
  switch (match.TAG) {
    case "Text" :
        let onChange = match.onChange;
        let match$1 = props.formValue;
        let type_;
        if (match$1.TAG === "Text") {
          let type_$1 = match$1.type_;
          type_ = type_$1 !== undefined ? type_$1 : "text";
        } else {
          type_ = "text";
        }
        let newrecord = Caml_obj.obj_dup(inputProps);
        tmp = JsxRuntime.jsx("input", (newrecord.onChange = (function (ev) {
          let target = ev.target;
          onChange(target.value);
        }), newrecord.value = match.value, newrecord.type = type_, newrecord.name = props.id, newrecord.id = props.id, newrecord));
        break;
    case "Int" :
        let onChange$1 = match.onChange;
        let newrecord$1 = Caml_obj.obj_dup(inputProps);
        tmp = JsxRuntime.jsx("input", (newrecord$1.onChange = (function (ev) {
          let target = ev.target;
          Core__Option.forEach(Core__Int.fromString(target.value, undefined), onChange$1);
        }), newrecord$1.value = match.value.toString(), newrecord$1.type = "number", newrecord$1.name = props.id, newrecord$1.id = props.id, newrecord$1));
        break;
    case "Boolean" :
        let onChange$2 = match.onChange;
        tmp = JsxRuntime.jsxs("label", {
          children: [
            JsxRuntime.jsx("input", {
              id: props.id,
              checked: match.value,
              type: "checkbox",
              onChange: (function (ev) {
                let target = ev.target;
                onChange$2(target.checked);
              })
            }),
            JsxRuntime.jsx("span", {})
          ]
        });
        break;
    case "Choice" :
        let onChange$3 = match.onChange;
        let value = match.value;
        let onChange$4 = function (ev) {
          let target = ev.target;
          if (target.checked) {
            return onChange$3(target.value);
          }
          
        };
        tmp = JsxRuntime.jsx("div", {
          children: match.items.map(function (param, idx) {
            let v = param.value;
            let id = props.id + "-" + idx.toString();
            let newrecord = Caml_obj.obj_dup(inputProps);
            return JsxRuntime.jsxs("label", {
              children: [
                param.label,
                JsxRuntime.jsx("input", (newrecord.onChange = onChange$4, newrecord.value = v, newrecord.type = "radio", newrecord.name = props.id, newrecord.checked = value === v, newrecord.id = id, newrecord))
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
  FormControl,
}
/* react/jsx-runtime Not a pure module */
