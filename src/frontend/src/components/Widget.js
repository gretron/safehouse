/**
 * Widget Container
 */
const Widget = ({
  label,
  value,
  unit,
  showState,
  state,
  children,
  className,
}) => {
  return (
    <div className={`widget ${className}`}>
      {children}
      <div className="widget__details">
        {label !== null && <div className="widget__label">{label}</div>}
        {value !== null && <div className="widget__value">{value}</div>}
        {unit !== null && <div className="widget__unit">{unit}</div>}
        {showState && (
          <label class="switch">
            <input type="checkbox" checked={state} />
            <span class="slider round"></span>
          </label>
        )}
      </div>
    </div>
  );
};

export default Widget;
