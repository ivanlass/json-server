import React from 'react';
import Tabs from '../Components/TabsUser'


function User(props) {

  return (
    <div className="App">
        <Tabs {...props}/>
    </div>
  );
}

export default User;