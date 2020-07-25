import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

interface State {
  isHover: boolean;
}

const customStyles = {

  control: (provided: object) => ({
    ...provided,
    width: '100%',
    backgroundColor: '#111',
    color: 'red',
    padding: '4px'
  }),

  menu: (provided: object) => ({
    ...provided,
    backgroundColor: '#111'
  }),

  option: (provided: object, state: State) => ({
    ...provided,
    backgroundColor: '#121212',
    fontSize: '18px'
  }),

  singleValue: (provided: object) => ({
    ...provided,
    color: '#D0D0D0',
    fontSize: '18px'
  })
}


const Select: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value.id) {
            return [];
          }
          return ref.state.value.id.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value.id) {
          return '';
        }
        return ref.state.value.id;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      styles={customStyles}
      {...rest}
    />
  );
};
export default Select;