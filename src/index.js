import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import './index.css';
import RequstWrapper from './react-components/singular-request-enhancer';

ReactDOM.render(
  <React.StrictMode>
    <RequstWrapper request={() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 3000);
      })
    }}>
      {({isLoading, proxiedRequest}) => <button className={cn('btn', {
        isLoading
      })} onClick={proxiedRequest}>测试loading</button>}
    </RequstWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

