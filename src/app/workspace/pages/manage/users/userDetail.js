import React, { useState } from 'react';

export default ({ closeDetail, name }) => {
  return <div style={{height: 500}}>
    user detail {name}
    <button onClick={() => closeDetail()}>x</button>
  </div>
}