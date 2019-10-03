import React from "react";
import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

// React.Componenet<Props, State>

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  // state have prerequisite that data of state is changed at any time
  public state = {
    countryCode: "+82",
    phoneNumber: ""
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneLoginPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    console.log(this.state);
  };
}

export default PhoneLoginContainer;
