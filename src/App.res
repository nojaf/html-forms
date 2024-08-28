open FormControl

type formData = {
  name: string,
  birthYear: int,
  password: string,
  alive: bool,
}

@react.component
let make = () => {
  let (data, setData) = React.useState(() => {
    name: "",
    birthYear: 1990,
    password: "",
    alive: true,
  })

  let onSubmit = (ev: ReactEvent.Form.t) => {
    ev->ReactEvent.Form.preventDefault
    Console.log(data)
  }

  <div>
    <h1> {React.string(`Yozora`)} </h1>
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
        labelText="Are you alive?"
        formValue={Boolean({
          value: data.alive,
          onChange: v => setData(d => {...d, alive: v}),
        })}
      />
      <button type_="submit"> {React.string(`Submit`)} </button>
    </form>
    <code>
      <pre>
        {{React.string(JSON.stringifyAny(data, ~space=4)->Option.getOr("meh"))}}
      </pre>
    </code>
  </div>
}
