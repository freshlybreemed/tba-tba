import { Button, Card, Row, Form, Input, message, Select } from 'antd';
import { Component } from 'react';
import Upload from '../../components/uielements/upload';
import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import axios from 'axios';
import actions from '../../redux/settings/actions';
const { updateSettings, updateSettingsSave, editSettings } = actions;
const FormItem = Form.Item;
const { Option } = Select;

class AccountSettings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.editSettings();
  }
  saveImage = url => {
    this.props.updateSettings({ image: url });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
    this.props.updateSettingsSave({
      ...this.props.user,
      accountSettings: this.props.accountSettings,
    });
    message.success('Successfully updated!');
  };
  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;
    const { accountSettingsForm } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    console.log(this.props);
    const validRoutingNumber = () => {
      const routing = getFieldValue('routingNumber');
      console.log(routing);
      if (routing.length !== 9) {
        return false;
      }

      // http://en.wikipedia.org/wiki/Routing_transit_number#MICR_Routing_number_format
      var checksumTotal =
        7 *
          (parseInt(routing.charAt(0), 10) +
            parseInt(routing.charAt(3), 10) +
            parseInt(routing.charAt(6), 10)) +
        3 *
          (parseInt(routing.charAt(1), 10) +
            parseInt(routing.charAt(4), 10) +
            parseInt(routing.charAt(7), 10)) +
        9 *
          (parseInt(routing.charAt(2), 10) +
            parseInt(routing.charAt(5), 10) +
            parseInt(routing.charAt(8), 10));

      var checksumMod = checksumTotal % 10;
      if (checksumMod !== 0) {
        return false;
      } else {
        return true;
      }
    };
    return (
      <>
        <Card
          title="Contact Settings"
          className="mb-4"
          bodyStyle={{ padding: '1rem' }}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="First Name">
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Last Name">
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Organizer Name">
              {getFieldDecorator('organizerName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Add a Profile Image">
              <Upload
                {...getFieldDecorator('image', {
                  rules: [{ required: true, message: 'Upload event image!' }],
                })}
                image={accountSettingsForm.image}
                saveImage={this.saveImage}
              />{' '}
            </FormItem>
          </Form>
        </Card>

        <Card
          title="Home Address"
          bodyStyle={{ padding: '1rem' }}
          className="mb-4"
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Address">
              {getFieldDecorator('homeAddress', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Address 2">
              {getFieldDecorator('homeAddress2', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="City">
              {getFieldDecorator('city', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Country">
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    initialValue: 'USA',
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Zip/Postal Code">
              {getFieldDecorator('zipCode', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="State">
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your event name!',
                    whitespace: true,
                  },
                ],
              })(
                <Select defaultValue="Select a State">
                  <Option value="Select a State">Select a State</Option>
                  <Option value="AL">Alabama</Option>
                  <Option value="AK">Alaska</Option>
                  <Option value="AZ">Arizona</Option>
                  <Option value="AR">Arkansas</Option>
                  <Option value="CA">California</Option>
                  <Option value="CO">Colorado</Option>
                  <Option value="CT">Connecticut</Option>
                  <Option value="DE">Delaware</Option>
                  <Option value="DC">District Of Columbia</Option>
                  <Option value="FL">Florida</Option>
                  <Option value="GA">Georgia</Option>
                  <Option value="HI">Hawaii</Option>
                  <Option value="ID">Idaho</Option>
                  <Option value="IL">Illinois</Option>
                  <Option value="IN">Indiana</Option>
                  <Option value="IA">Iowa</Option>
                  <Option value="KS">Kansas</Option>
                  <Option value="KY">Kentucky</Option>
                  <Option value="LA">Louisiana</Option>
                  <Option value="ME">Maine</Option>
                  <Option value="MD">Maryland</Option>
                  <Option value="MA">Massachusetts</Option>
                  <Option value="MI">Michigan</Option>
                  <Option value="MN">Minnesota</Option>
                  <Option value="MS">Mississippi</Option>
                  <Option value="MO">Missouri</Option>
                  <Option value="MT">Montana</Option>
                  <Option value="NE">Nebraska</Option>
                  <Option value="NV">Nevada</Option>
                  <Option value="NH">New Hampshire</Option>
                  <Option value="NJ">New Jersey</Option>
                  <Option value="NM">New Mexico</Option>
                  <Option value="NY">New York</Option>
                  <Option value="NC">North Carolina</Option>
                  <Option value="ND">North Dakota</Option>
                  <Option value="OH">Ohio</Option>
                  <Option value="OK">Oklahoma</Option>
                  <Option value="OR">Oregon</Option>
                  <Option value="PA">Pennsylvania</Option>
                  <Option value="RI">Rhode Island</Option>
                  <Option value="SC">South Carolina</Option>
                  <Option value="SD">South Dakota</Option>
                  <Option value="TN">Tennessee</Option>
                  <Option value="TX">Texas</Option>
                  <Option value="UT">Utah</Option>
                  <Option value="VT">Vermont</Option>
                  <Option value="VA">Virginia</Option>
                  <Option value="WA">Washington</Option>
                  <Option value="WV">West Virginia</Option>
                  <Option value="WI">Wisconsin</Option>
                  <Option value="WY">Wyoming</Option>
                </Select>,
              )}
            </FormItem>
          </Form>
        </Card>
        <Button onClick={this.handleSubmit} type="primary" htmlType="submit">
          Update
        </Button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.Settings.toJS(),
    user: state.Auth.toJS().idToken,
  };
};
export default connect(mapStateToProps, {
  updateSettings,
  updateSettingsSave,
  editSettings,
})(
  createForm({
    onFieldsChange(props, changedFields) {
      console.log(props.form.getFieldsValue());
      props.updateSettings(changedFields);
    },
    mapPropsToFields(props) {
      return {
        firstName: createFormField(props.accountSettingsForm.firstName),
        lastName: createFormField(props.accountSettingsForm.lastName),
        city: createFormField(props.accountSettingsForm.city),
        organizerName: createFormField(props.accountSettingsForm.organizerName),
        homeAddress: createFormField(props.accountSettingsForm.homeAddress),
        homeAddress2: createFormField(props.accountSettingsForm.homeAddress2),
        country: createFormField(props.accountSettingsForm.country),
        zipCode: createFormField(props.accountSettingsForm.zipCode),
        state: createFormField(props.accountSettingsForm.state),
      };
    },
  })(AccountSettings),
);
