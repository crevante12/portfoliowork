import { useContext } from 'react';
import FunkoData from './FunkoData';
import { UserContext } from '../context/UserProvider.js';

export default function FunkoList(props) {
  const { deleteFunko, editFunko} = useContext(UserContext);
  const { Funko } = props;
  console.log(Funko);

  // Check if Funko is an array before mapping over it
  if (!Array.isArray(Funko)) {
    return <div className="todo-list">No Funko's available</div>;
  }

  return (
    <div className="issue-grid">
      {Funko.map((funko) => (
        <FunkoData
          {...funko}
          key={funko.title}
          deleteFunko={deleteFunko}
          editFunko={editFunko}
        />
      ))}
    </div>
  );
}
