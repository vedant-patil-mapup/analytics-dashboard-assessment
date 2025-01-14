import PropTypes from "prop-types";

const TopModelsCard = ({ models }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top EV Models</h3>
      <div className="space-y-4">
        {models.map((model, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                {idx + 1}.
              </span>
              <div>
                <p className="font-medium">{model.model}</p>
                <p className="text-sm text-gray-600">{model.make}</p>
              </div>
            </div>
            <span className="text-sm font-medium">
              {model.count.toLocaleString()} units
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
TopModelsCard.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      model: PropTypes.string.isRequired,
      make: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TopModelsCard;
