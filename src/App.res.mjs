// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as FormControl from "./FormControl.res.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.res.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function tryParseRace(v, fallback) {
  if ("TenMiles" === v) {
    return "TenMiles";
  } else if ("EightKm" === v) {
    return "EightKm";
  } else if ("Walking" === v) {
    return "Walking";
  } else {
    return fallback;
  }
}

function App(props) {
  let match = React.useState(() => ({
    name: "",
    birthYear: 1990,
    password: "",
    breakfast: true,
    race: "TenMiles",
    remark: ""
  }));
  let setData = match[1];
  let data = match[0];
  let onSubmit = ev => {
    ev.preventDefault();
    console.log(data);
  };
  return JsxRuntime.jsxs("div", {
    children: [
      JsxRuntime.jsx("h1", {
        children: "HTML Forms"
      }),
      JsxRuntime.jsxs("form", {
        children: [
          JsxRuntime.jsx(FormControl.FormControl.make, {
            inputProps: {
              placeholder: "bvb Jimmy Frey",
              required: true
            },
            formValue: {
              TAG: "Text",
              value: data.name,
              onChange: v => setData(d => ({
                name: v,
                birthYear: d.birthYear,
                password: d.password,
                breakfast: d.breakfast,
                race: d.race,
                remark: d.remark
              }))
            },
            id: "name",
            labelText: "Naam"
          }),
          JsxRuntime.jsx(FormControl.FormControl.make, {
            inputProps: {
              placeholder: "birthyear",
              required: true
            },
            formValue: {
              TAG: "Int",
              value: data.birthYear,
              onChange: v => setData(d => ({
                name: d.name,
                birthYear: v,
                password: d.password,
                breakfast: d.breakfast,
                race: d.race,
                remark: d.remark
              }))
            },
            id: "birthYear",
            labelText: "Geboorte jaar"
          }),
          JsxRuntime.jsx(FormControl.FormControl.make, {
            formValue: {
              TAG: "Boolean",
              value: data.breakfast,
              onChange: v => setData(d => ({
                name: d.name,
                birthYear: d.birthYear,
                password: d.password,
                breakfast: v,
                race: d.race,
                remark: d.remark
              }))
            },
            id: "alive",
            labelText: "Do you want breakfast?"
          }),
          JsxRuntime.jsx(FormControl.FormControl.make, {
            formValue: {
              TAG: "Choice",
              value: data.race,
              items: [
                {
                  value: "TenMiles",
                  label: "Ten Miles"
                },
                {
                  value: "EightKm",
                  label: "Eight km"
                },
                {
                  value: "Walking",
                  label: "Wandelen"
                }
              ],
              onChange: r => setData(d => ({
                name: d.name,
                birthYear: d.birthYear,
                password: d.password,
                breakfast: d.breakfast,
                race: tryParseRace(r, data.race),
                remark: d.remark
              }))
            },
            id: "race",
            labelText: "Wedstrijd"
          }),
          JsxRuntime.jsx(FormControl.FormControl.make, {
            formValue: {
              TAG: "Text",
              value: data.remark,
              type_: "Textarea",
              onChange: v => setData(d => ({
                name: d.name,
                birthYear: d.birthYear,
                password: d.password,
                breakfast: d.breakfast,
                race: d.race,
                remark: v
              }))
            },
            id: "remark",
            labelText: "Opmerking"
          }),
          JsxRuntime.jsx("button", {
            children: "Submit",
            type: "submit"
          })
        ],
        onSubmit: onSubmit
      }),
      JsxRuntime.jsx("code", {
        children: JsxRuntime.jsx("pre", {
          children: Core__Option.getOr(JSON.stringify(data, undefined, 4), "meh")
        })
      })
    ]
  });
}

let make = App;

export {
  make,
}
/* react Not a pure module */
