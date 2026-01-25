import Introduction from './Introduction';
import Present from './Present';
import Future from './Future';
import Approach from './Approach';

const Landing = ({ navigateTo }) => {
  return (
    <>
      <Introduction navigateTo={navigateTo} />
      <Present />
      <Future />
      <Approach />
    </>
  );
};

export default Landing;
