import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

interface Props {
  color?: string;
  label?: boolean;
  outline?: any;
  size?: '' | 'lg' | 'sm';
  checked?: boolean;
  defaultChecked?: boolean;
  defaultValue?: any;
  value?: string;
  disabled?: boolean;
  form?: any;
  name?: string;
  required?: boolean;
  onChange?: (e: any) => void;
  type?: 'checkbox' | 'radio';
  variant?: '' | '3d' | 'pill';
  className?: string;
  dataOn?: string;
  dataOff?: string;
}

const Switch: React.FC<Props> = ({
  className,
  color = 'secondary',
  name,
  label = false,
  outline = false,
  size = '',
  checked = false,
  defaultChecked = undefined,
  disabled = undefined,
  required = undefined,
  type = 'checkbox',
  variant = '',
  value,
  dataOn = 'On',
  dataOff = 'Off',
  onChange,
  ...attributes
}) => {
  const [uncontrolled] = useState(!!defaultChecked);
  const [checkedState, setCheckedState] = useState(defaultChecked || checked);

  const toggleState = (check: boolean) => {
    setCheckedState(check);
  };

  const handleChange = (e: any) => {
    const { target } = e;
    toggleState(target.checked);

    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === ' ') {
      e.preDefault();
    }
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleState(!checkedState);
    }
  };

  useEffect(() => {
    if (!uncontrolled && checked !== checkedState) {
      toggleState(checked);
    }
  }, [checked, checkedState, uncontrolled]);

  const classes = classNames(
    className,
    'switch',
    label ? 'switch-label' : false,
    size ? `switch-${size}` : false,
    variant ? `switch-${variant}` : false,
    `switch${outline ? '-outline' : ''}-${color}${outline === 'alt' ? '-alt' : ''}`,
    'form-check-label',
  );

  const inputClasses = classNames('switch-input', 'form-check-input');

  const sliderClasses = classNames('switch-slider');

  return (
    <label className={classes} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown}>
      <input
        type={type}
        className={inputClasses}
        onChange={handleChange}
        checked={checkedState}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        {...attributes}
      />
      <span className={sliderClasses} data-checked={dataOn} data-unchecked={dataOff} />
    </label>
  );
};

export default Switch;
