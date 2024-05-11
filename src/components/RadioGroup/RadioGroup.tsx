import * as React from 'react';
import type { IRadioGroupProps, IOption } from './RadioGroup.types';
import './RadioGroup.css';

export const RadioGroup: React.FC<IRadioGroupProps> = (props: IRadioGroupProps) => {
  const {
    options,
    optionGroupName,
    onChange
  } = props;
  const [selected, setSelected] = React.useState<string|undefined>(undefined);
  const baseClass = "radioGroup"

  if(Array.isArray(options) && options.length > 0) {
    return (
      <div className={baseClass}>
        {options.map((opt: IOption, idx: number) => (
          <div
            className={`${baseClass}__choice ${opt.key === selected? `${baseClass}__choice--selected` : ''}`}
            key={`${optionGroupName}-opt-${idx}-${opt.key}`}
          >
            <label>
              <input
                type="radio"
                id={opt.key}
                name={optionGroupName}
                value={opt.value}
                checked={opt.key === selected}
                onChange={ () => {
                  setSelected(opt.key)
                  if (typeof onChange === 'function' && onChange) { onChange(opt.value); }
                }}
              />
              {opt.label}
            </label>
          </div>
        ))}
      </div>
    )
  } else {
    console.warn(`property 'options' being passed is not an array or is an empty array`)
    return null
  }
}

