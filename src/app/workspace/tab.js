import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PagesContext from 'Context/pagesContext';
import './styles.scss';

const Tab = ({ page, match }) => {
  const { removePage } = useContext(PagesContext);

  return <div key={page.id}>
    <span onClick={(event) => {
      event.stopPropagation();
      removePage({id: page.id})
    }}>X</span>
    <Link to={`${match.url}/${page.path}`} >{page.title}</Link>
  </div>
}

export default withRouter(props => <Tab {...props} />);
