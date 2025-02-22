import { Navigate } from "react-router";

// eslint-disable-next-line react/prop-types
const Protected = ({isAuth, children}) => {
  if(isAuth){
    return children;
  }
  else{
    return <Navigate to={'/login'} />
  }
}

export default Protected