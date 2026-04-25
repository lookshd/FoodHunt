const shimmer_card_unit = 12;
const shimmer_menu_card_unit = 6;

const CardShimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img animate"></div>
      <div className="shimmer-title animate"></div>
      <div className="shimmer-tags animate"></div>
      <div className="shimmer-details animate"></div>
    </div>
  );
};

export const MenuShimmer = () => {
  return (
    <div className="shimmer-menu-page">
      <div className="shimmer-summary">
        <div className="shimmer-img animate" style={{ width: 180, height: 140, borderRadius: 12, flexShrink: 0 }}></div>
        <div className="shimmer-summary-details">
          <div className="shimmer-w40 animate"></div>
          <div className="shimmer-w60 animate"></div>
          <div className="shimmer-w20 animate"></div>
        </div>
      </div>

      <div>
        <div className="shimmer-w40 animate" style={{ marginBottom: 20 }}></div>
        {Array(shimmer_menu_card_unit)
          .fill("")
          .map((_, index) => (
            <div className="shimmer-menu-card" key={index}>
              <div className="shimmer-item-details">
                <div className="shimmer-w40 animate"></div>
                <div className="shimmer-w20 animate"></div>
                <div className="shimmer-w60 animate"></div>
              </div>
              <div className="shimmer-img-wrapper">
                <div className="shimmer-img animate"></div>
                <div className="shimmer-btn animate"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(shimmer_card_unit)
        .fill("")
        .map((_, index) => (
          <CardShimmer key={index} />
        ))}
    </div>
  );
};

export default Shimmer;
