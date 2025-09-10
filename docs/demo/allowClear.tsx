/* eslint no-console:0 */
import InputNumber from '@rc-component/input-number';
import React from 'react';
import '../../assets/index.less';

export default () => {
  const [value, setValue] = React.useState<string | number>(null);

  const onChange = (val: number | null) => {
    console.warn('onChange:', val, typeof val);
    setValue(val);
  };

  return (
    <div style={{ margin: 10 }}>
      <h3>Controlled</h3>
      <InputNumber
        aria-label="Simple number input example"
        min={-8}
        max={10}
        style={{ width: 100 }}
        value={value}
        allowClear
        onChange={onChange}
      />
      <hr />
      <h3>Uncontrolled</h3>
      <InputNumber
        style={{ width: 100 }}
        onChange={onChange}
        min={-99}
        max={99}
        defaultValue={33}
        allowClear
      />

      <hr />
      <h3>!changeOnBlur</h3>
      <InputNumber
        style={{ width: 100 }}
        min={-9}
        max={9}
        allowClear
        defaultValue={10}
        onChange={onChange}
        changeOnBlur={false}
      />
    </div>
  );
};
