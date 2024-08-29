type choiceItem = {
  value: string,
  label: string,
}

type formValue =
  | Text({value: string, type_?: string, onChange: string => unit})
  | Int({value: int, onChange: int => unit})
  | Boolean({value: bool, onChange: bool => unit})
  | Choice({value: string, items: array<choiceItem>, onChange: string => unit})

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
      | Boolean({value, onChange}) =>
        <label>
          <input
            type_="checkbox"
            id={props.id}
            checked={value}
            onChange={ev => {
              let target = ev->JsxEvent.Form.target
              target["checked"]->onChange
            }}
          />
          <span />
        </label>
      | Choice({value, onChange, items}) =>
        let onChange = ev => {
          let target = ev->ReactEvent.Form.target
          if target["checked"] {
            onChange(target["value"])
          }
        }
        <div className="choice">
          {items
          ->Array.mapWithIndex(({label, value: v}, idx) => {
            let id = `${props.id}-${Int.toString(idx)}`
            <label htmlFor={id} key={id}>
              {React.string(label)}
              <input
                {...inputProps}
                type_="radio"
                id={id}
                name={props.id}
                value={v}
                checked={value === v}
                onChange
              />
            </label>
          })
          ->React.array}
        </div>
      }}
    </div>
  }
}
