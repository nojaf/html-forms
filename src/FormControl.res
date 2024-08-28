type formValue =
  | Text({value: string, type_?: string, onChange: string => unit})
  | Int({value: int, onChange: int => unit})
  | Boolean({value: bool, onChange: bool => unit})

// TODO: memoize
module FormControl = {
  type props = {
    inputProps?: JsxDOM.domProps,
    formValue: formValue,
    id: string,
    labelText?: string,
  }

  let make = (props: props) => {
    let inputProps = props.inputProps->Option.getOr({})

    <div className="form-control">
      {switch props.labelText {
      | None => React.null
      | Some(labelText) => <label htmlFor={props.id}> {React.string(labelText)} </label>
      }}
      {switch props.formValue {
      | Text({value, onChange}) =>
        let type_ = switch props.formValue {
        | Text({type_}) => type_
        | _ => "text"
        }
        <input
          {...inputProps}
          id={props.id}
          name={props.id}
          type_
          value={value}
          onChange={ev => {
            let target = ev->JsxEvent.Form.target
            onChange(target["value"])
          }}
        />
      | Int({value, onChange}) =>
        <input
          {...inputProps}
          id={props.id}
          name={props.id}
          type_="number"
          value={value->Int.toString}
          onChange={ev => {
            let target = ev->JsxEvent.Form.target
            target["value"]->Int.fromString->Option.forEach(onChange)
          }}
        />
        | Boolean({ value, onChange}) =>
          <label>
            <input type_="checkbox" id={props.id} checked={value} onChange={ev => {
              let target = ev->JsxEvent.Form.target
              target["checked"]->onChange
            }} />
            <span></span>
          </label>
      }}
    </div>
  }
}
