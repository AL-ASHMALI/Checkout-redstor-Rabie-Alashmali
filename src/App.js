import Checkout, { pricingRules } from './Checkout.jsx';

const App = (props) => {
  return (
    <div className='App'>
      <Checkout pricingRules={pricingRules} />
    </div>
  );
};

export default App;
