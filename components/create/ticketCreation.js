import Button from '../../components/uielements/button';
import Input from '../../components/uielements/input';
import Form from '../../components/uielements/form';
import RadioBox, { RadioGroup } from '../../components/uielements/radio';
import List from '../../components/uielements/list';
import Avatar from '../../components/uielements/avatar';
import Icon from '../../components/uielements/icon';
import Modal from '../../components/uielements/modal';
import InputNumber from '../uielements/inputNumber';
import Checkbox from '../uielements/checkbox';
import ConfigProvider from 'antd';

import { connect } from 'react-redux';
import { createForm, createFormField } from 'rc-form';
import actions from '../../redux/create/actions';

const { ticketCreation, ticketDeletion } = actions;
class TicketCreateForm extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue,
      getFieldError,
    } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new ticket"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="inline">
          <Form.Item
            label="Ticket Name"
            validateStatus={getFieldError('name') ? 'error' : ''}
            help={getFieldError('name') ? 'Enter a ticket name' : ''}
          >
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  type: 'string',
                  min: 1,
                  message: 'Please input the title of collection!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label="Quantity"
            validateStatus={getFieldError('startingQuantity') ? 'error' : ''}
            help={
              getFieldError('startingQuantity')
                ? 'Enter a quantity greater than 1'
                : ''
            }
          >
            {getFieldDecorator('startingQuantity', {
              rules: [{ required: true, type: 'number', min: 0 }],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="Price">
            {getFieldDecorator('price', {
              initialValue: 0,
            })(
              <InputNumber
                min={0}
                disabled={getFieldValue('type') === 'free'}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
              />,
            )}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="Show guests number of remaining tickets">
            {getFieldDecorator('showRemaining', {})(<Checkbox />)}
          </Form.Item>
          <Form.Item label="Ticket Type">
            {getFieldDecorator('type', {
              initialValue: 'free',
              getValueFromEvent: e => {
                if (e.target.value === 'free') {
                  setFieldsValue({ price: 0 });
                }
                return e.target.value;
              },
            })(
              <RadioGroup>
                <RadioBox value="free">Free</RadioBox>
                <RadioBox value="paid">Paid</RadioBox>
              </RadioGroup>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

class TicketCreation extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  editTicket = tix => {
    const { form } = this.formRef.props;
    this.setState({ visible: true });
    form.setFieldsValue(tix);
    console.log('edit', form.getFieldsValue());
    this.saveFormRef();
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const { form } = this.formRef.props;
    console.log('props', this.props);

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let formFields = values;
      formFields.currentQuantity = values.startingQuantity;
      //ticketing fees
      formFields.fees = values.price * 0.032 + 1.3;
      let tickets = { ...this.props.tickets };
      tickets[values.name] = formFields;
      form.resetFields();
      let ticket = {};
      ticket[formFields.name] = formFields;
      this.props.ticketCreation(ticket);
      this.setState({ visible: false }, () => console.log(this.state));
    });
  };

  removeTicket = tix => {
    this.props.ticketDeletion(tix);
  };
  saveFormRef = formRef => {
    console.log('saving', formRef);
    this.formRef = formRef;
  };

  render() {
    const customizeRenderEmpty = () => (
      <div style={{ textAlign: 'center' }}>
        <Icon type="smile" style={{ fontSize: 20 }} />
        <p>No Tickets Created</p>
      </div>
    );

    return (
      <div>
        {/* <ConfigProvider renderEmpty={customizeRenderEmpty}> */}
        <List
          itemLayout="horizontal"
          dataSource={this.props.tixArray}
          renderItem={item => (
            <List.Item
              actions={[
                <a onClick={() => this.removeTicket(item.name)}>delete</a>,
                <a onClick={() => this.editTicket(item)}>edit</a>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon="tag" />}
                title={item.name}
                description={item.description}
              />
              <List.Item.Meta
                title={`Quantity: ${item.currentQuantity}/${item.startingQuantity}`}
              />
              <div>{item.price === 0 ? 'Free' : `$${item.price}`}</div>
            </List.Item>
          )}
        />
        {/* </ConfigProvider> */}
        <br />
        <Button type="primary" onClick={this.showModal}>
          Add Ticket
        </Button>
        <TicketCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

TicketCreateForm = connect(state => {
  return {};
})(
  createForm({
    onFieldsChange(props, changedFields) {
      console.log(props.form.getFieldsValue());
    },
    mapPropsToFields(props) {
      console.log(props);
      return {
        name: createFormField(props.name),
        description: createFormField(props.description),
        startingQuantity: createFormField(props.startingQuantity),
        price: createFormField(props.price),
        type: createFormField(props.type),
      };
    },
    onValuesChange(_, values) {
      console.log(values);
    },
  })(TicketCreateForm),
);

TicketCreation = connect(
  state => {
    console.log('state', state);
    let tickets = { ...state.Create.toJS().createdEventForm.ticketTypes };
    const tixArray = [];
    for (var tix in tickets) {
      tixArray.push(tickets[tix]);
    }
    return {
      //   tickets: state.Create.toJS().createdEvent.ticketTypes,
      tixArray,
    };
  },
  { ticketCreation, ticketDeletion },
)(TicketCreation);

export default TicketCreation;
