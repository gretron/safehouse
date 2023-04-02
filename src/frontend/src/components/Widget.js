/**
 * Widget Container
 */
const Widget = ({ label, value, unit, showState, state, children }) => {
  return (
    <div className="widget">
      {children}
      {label && <div className="widget__label">{label}</div>}
      {value && <div className="widget__value">{value}</div>}
      {unit && <div className="widget__unit">{unit}</div>}
      {showState && (
        <label class="switch">
          <input type="checkbox" checked={state} />
          <span class="slider round"></span>
        </label>
      )}
    </div>
  );
};

export default Widget;
