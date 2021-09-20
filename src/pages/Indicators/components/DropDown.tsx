import React,{Dispatch, SetStateAction} from 'react'


interface DropDownProps{ 
    label:string,
    options:string[]
    selectedOption:string,
    change:Dispatch<SetStateAction<string>>
}
const DropDown:React.FC<DropDownProps>=({label,options,selectedOption,change})=> { 

    const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

    return (
        <label htmlFor={id}>
      {" "}
      {label}{" "}
      <select
        data-testid={id}
        id={id}
        value={selectedOption}
        onChange={(e) => change(e.target.value)}
        onBlur={(e) => change(e.target.value)}
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
    )
}

export default DropDown
