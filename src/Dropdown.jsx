import { useState, useLayoutEffect, useRef } from 'react';

export default function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const triggerRef = useRef(null);
  const dropMenuRef = useRef(null);

  useLayoutEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const menu = dropMenuRef.current;
    const { height } = menu.getBoundingClientRect();
    const styles = window.getComputedStyle(menu);
    const gap = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

    const spaceAbove = trigger.top;
    const spaceBelow = window.innerHeight - trigger.bottom;

    setUp(spaceAbove < height + gap && spaceAbove > spaceBelow);
  }, [open]);

  const toggle = () => setOpen((isOpen) => !isOpen);

  return (
    <div className={"dropdown"}>
      <button ref={triggerRef} type="button" onClick={toggle}>{value} ▾</button>
      {open && (
        <ul ref={dropMenuRef} className={up ? 'dropdown-menu up' : 'dropdown-menu'}>
          {options.map((v) => (
            <li
              key={v}
              onClick={() => {
                onChange(v);
                setOpen(false);
              }}
            >
              {v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
