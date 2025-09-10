import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputNumber from '../src';

describe('InputNumber.allowClear', () => {
  it('renders clear icon when allowClear enabled', () => {
    const { container } = render(<InputNumber allowClear />);
    const clearBtn = container.querySelector('.rc-input-number-clear-icon');
    expect(clearBtn).toBeTruthy();
    expect(clearBtn.classList.contains('rc-input-number-clear-icon-hidden')).toBeFalsy();
  });

  it('hides clear icon when disabled or readOnly', () => {
    const { container: disabledCtn } = render(<InputNumber allowClear disabled />);
    const disabledClear = disabledCtn.querySelector('.rc-input-number-clear-icon');
    expect(disabledClear).toBeTruthy();
    expect(disabledClear.classList.contains('rc-input-number-clear-icon-hidden')).toBeTruthy();

    const { container: readOnlyCtn } = render(<InputNumber allowClear readOnly />);
    const readOnlyClear = readOnlyCtn.querySelector('.rc-input-number-clear-icon');
    expect(readOnlyClear).toBeTruthy();
    expect(readOnlyClear.classList.contains('rc-input-number-clear-icon-hidden')).toBeTruthy();
  });

  it('controlled: click clear sets value to null, then step starts from 0', () => {
    const calls: (number | null)[] = [];

    function Demo() {
      const [val, setVal] = React.useState<number | null>(5);
      const onChange = (v: number | null) => {
        calls.push(v as any);
        setVal(v);
      };
      return <InputNumber allowClear value={val} onChange={onChange} />;
    }

    const { container } = render(<Demo />);

    const clearBtn = container.querySelector('.rc-input-number-clear-icon') as HTMLElement;
    fireEvent.mouseDown(clearBtn);
    fireEvent.click(clearBtn);

    // cleared to null
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[calls.length - 1]).toBeNull();

    // Step up should start from 0 -> 1
    const upBtn = container.querySelector('.rc-input-number-handler-up') as HTMLElement;
    fireEvent.mouseDown(upBtn);
    fireEvent.mouseUp(upBtn);
    fireEvent.click(upBtn);

    expect(calls[calls.length - 1]).toBe(1);
  });

  it('uncontrolled with defaultValue: typing then clear resets to defaultValue, then step from default', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber allowClear defaultValue={33} onChange={onChange} />);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '88' } });

    // Clear -> back to defaultValue 33
    const clearBtn = container.querySelector('.rc-input-number-clear-icon') as HTMLElement;
    fireEvent.mouseDown(clearBtn);
    fireEvent.click(clearBtn);

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBe(33);

    // Step up -> 34
    const upBtn = container.querySelector('.rc-input-number-handler-up') as HTMLElement;
    fireEvent.mouseDown(upBtn);
    fireEvent.mouseUp(upBtn);
    fireEvent.click(upBtn);

    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBe(34);
  });

  it('uncontrolled without defaultValue: typing then clear to null, then step from 0 -> 1', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber allowClear onChange={onChange} />);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '88' } });

    const clearBtn = container.querySelector('.rc-input-number-clear-icon') as HTMLElement;
    fireEvent.mouseDown(clearBtn);
    fireEvent.click(clearBtn);

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeNull();

    const upBtn = container.querySelector('.rc-input-number-handler-up') as HTMLElement;
    fireEvent.mouseDown(upBtn);
    fireEvent.mouseUp(upBtn);
    fireEvent.click(upBtn);

    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBe(1);
  });
});