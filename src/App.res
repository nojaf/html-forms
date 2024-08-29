open FormControl

type race = TenMiles | EightKm | Walking

let tryParseRace = (v: string, fallback: race) => {
  switch v {
  | _ if (TenMiles :> string) == v => TenMiles
  | _ if (EightKm :> string) == v => EightKm
  | _ if (Walking :> string) == v => Walking
  | _ => fallback
  }
}

type formData = {
  name: string,
  birthYear: int,
  password: string,
  breakfast: bool,
  race: race,
}

@react.component
let make = () => {
  let (data, setData) = React.useState(() => {
    name: "",
    birthYear: 1990,
    password: "",
    breakfast: true,
    race: TenMiles,
  })

  let onSubmit = (ev: ReactEvent.Form.t) => {
    ev->ReactEvent.Form.preventDefault
    Console.log(data)
  }

  <div>
    <h1> {React.string(`HTML Forms`)} </h1>
    <form onSubmit>
      <FormControl
        id="name"
        formValue={Text({
          value: data.name,
          onChange: v => setData(d => {...d, name: v}),
        })}
        inputProps={
          placeholder: "bvb Jimmy Frey",
          required: true,
        }
        labelText="Naam"
      />
      <FormControl
        id="birthYear"
        labelText="Geboorte jaar"
        formValue={Int({
          value: data.birthYear,
          onChange: v => setData(d => {...d, birthYear: v}),
        })}
        inputProps={
          placeholder: "birthyear",
          required: {true},
        }
      />
      <FormControl
        id="alive"
        labelText="Do you want breakfast?"
        formValue={Boolean({
          value: data.breakfast,
          onChange: v => setData(d => {...d, breakfast: v}),
        })}
      />
      <FormControl
        id="race"
        labelText="Wedstrijd"
        formValue={Choice({
          value: (data.race :> string),
          onChange: r => setData(d => {...d, race: tryParseRace(r, data.race)}),
          items: [
            {
              label: "Ten Miles",
              value: (TenMiles :> string),
            },
            {
              label: "Eight km",
              value: (EightKm :> string),
            },
            {
              label: "Wandelen",
              value: (Walking :> string),
            },
          ],
        })}
      />
      <button type_="submit"> {React.string(`Submit`)} </button>
    </form>
    <code>
      <pre> {React.string(JSON.stringifyAny(data, ~space=4)->Option.getOr("meh"))} </pre>
    </code>
  </div>
}
