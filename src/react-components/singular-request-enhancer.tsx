import React, { Component } from 'react';

type childrenRenderParams = { isLoading: boolean; proxiedRequest: () => any };
type Props = {
  request: () => Promise<any>;
  children: (params: childrenRenderParams) => React.ReactChildren;
  onFailed?: () => void;
};

type State = {
  isLoading: boolean;
};
export default class SingularRequestEnhancer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  proxiedRequest = () => {
    const { isLoading } = this.state;
    const { request, onFailed } = this.props;
    if (isLoading) return false;
    this.setState({
      isLoading: true,
    });
    request()
      .catch(() => {
        if (onFailed) onFailed();
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  
  render() {
    const { isLoading } = this.state;
    const { children } = this.props;
    return (
      <div>{children({ isLoading, proxiedRequest: this.proxiedRequest })}</div>
    );
  }
}
