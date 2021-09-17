import React,{ useState} from 'react'

//I used custom hook to avoid code duplication cause we need two dropdown in this project
const useDropdown=(label:string,defaultState:string,options:string[])=> {  
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
    <label htmlFor={id}>
      {" "}
      {label}{" "}
      <select
        data-testid={id}
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={options.length === 0}
      >  
        {options.map((item,i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </label>
  );
  return [state, Dropdown,setState] as const;
  };
  
  export default useDropdown;

