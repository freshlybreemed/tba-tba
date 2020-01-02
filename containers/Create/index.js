import { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/uielements/button';
import Input from '../../components/uielements/input';
import Form from '../../components/uielements/form';
import message from '../../components/uielements/message';
import Switch from '../../components/uielements/switch';
import Tooltip from '../../components/uielements/tooltip';
import Checkbox from '../../components/uielements/checkbox';
import DatePicker from '../../components/uielements/datePicker';
import TimePicker from '../../components/uielements/timePicker';
import { createForm, createFormField, formShape } from 'rc-form';
import PlacesAutocomplete from 'react-places-autocomplete';

import PropTypes from 'prop-types';
import moment from 'moment';
import actions from '../../redux/create/actions';
import { Icon } from 'antd';

const FormItem = Form.Item;
const { saveField } = actions;
class Create extends Component {
  static propTypes = {
    form: formShape,
    name: PropTypes.object,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      this.quill = require('react-quill');
    }
    this.state = {
      ready: false,
      event: {
        location: {
          name: '',
          address: {
            streetAddress: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
          },
        },
      },
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['clean'], // remove formatting button
        ],
      },
    };
  }

  componentDidMount() {
    var set = () => this.setState({ ready: true });
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBWqhUxBtnG59S2Lx47umesuG-NnLpMGSA&libraries=places';
    script.async = true;
    script.onload = set;
    document.body.appendChild(script);
    if (this.props.event) {
      this.props.dispatch({ type: 'edit_event', payload: this.props.event });
    }
  }

  getDetailsForPlaceId = (placeId, name) => {
    return new Promise((resolve, reject) => {
      const placesService = new window.google.maps.places.PlacesService(
        document.createElement('div'),
      );
      const request = {
        placeId,
        fields: ['address_components'],
      };
      placesService.getDetails(request, (result, status) => {
        var location = {
          itemRoute: '',
          streetAddress: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        };
        console.log(result);
        const address = result.address_components;
        address.forEach(address_component => {
          switch (address_component.types[0]) {
            case 'route':
              location.itemRoute = address_component.short_name;
              break;
            case 'locality':
              location.city = address_component.short_name;
              break;
            case 'administrative_area_level_1':
              location.state = address_component.short_name;
              break;
            case 'country':
              location.country = address_component.short_name;
              break;
            case 'postal_code':
              location.postalCode = address_component.short_name;
              break;
            case 'street_number':
              location.streetAddress = address_component.short_name;
              break;
            default:
              break;
          }
        });
        if (location.itemRoute) {
          location.streetAddress =
            location.streetAddress + ' ' + location.itemRoute;
        }
        delete location.itemRoute;
        var obj = { ...this.state.event };
        obj.location.address = location;
        location.name = name;
        // this.props.dispatch({
        //   type: 'save_fields',
        //   payload: {
        //     createdEventForm: {
        //       location,
        //     },
        //   },
        // });
        this.setState({ event: obj }, () => console.log(this.state));
      });
    });
  };

  handleLocationChange = address => {
    var event = { ...this.state.event };
    event.location.name = address;
    this.setState({ event }, () => console.log(this.state));
    var location = { ...this.props.formState.location };
    location.name = address;
    this.props.dispatch({
      type: 'save_fields',
      payload: {
        createdEventForm: {
          location,
        },
      },
    });
  };

  handleSelect = async (address, placeId) => {
    var event = { ...this.state.event };
    event.location.name = address;
    this.setState({ event });
    this.getDetailsForPlaceId(placeId, address);
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/event', {
        data: this.props.createdEvent,
      })
      .then(res => {
        message.success('Successfully created!');
        this.props.dispatch({
          type: 'fetch_events',
          payload: res.data,
        });
        window.location = '/myevents';
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    console.log(this.props);
    this.props.dispatch({
      type: 'save_fields',
      payload: {
        createdEventForm: {
          description: {
            dirty: false,
            errors: undefined,
            name: 'createdEventForm.description',
            touched: true,
            validating: false,
            value: e,
          },
        },
      },
    });
  };

  render() {
    const ReactQuill = this.quill;
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldProps,
      getFieldError,
      setFieldsValue,
    } = this.props.form;
    const { formState, createdEvent } = this.props;
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const isBefore = (rule, value, callback) => {
      if (value.isAfter(getFieldValue('createdEventForm.startTime'))) {
        console.log(true);
        callback();
      }
      console.log(false);
      callback('End time must be after start time');
    };
    const slugNameAvailable = async (rule, value, callback) => {
      var availabe = null;
      await axios
        .get(`/api/event/${getFieldValue('createdEventForm.slug')}`)
        .then(res => {
          availabe = res.data.length === 0;
        });
      // console.log)
      if (availabe) {
        callback();
      } else {
        callback('failure');
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Event Title">
          <Input
            {...getFieldProps('createdEventForm.title', {
              getValueFromEvent: e => {
                return e.target.value;
              },
              rules: [
                {
                  required: true,
                  message: 'Please input your event name!',
                  whitespace: true,
                },
              ],
            })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Location">
          {this.state.ready ? (
            <PlacesAutocomplete
              value={
                typeof formState.location !== 'undefined'
                  ? formState.location.name
                  : ''
              }
              onChange={this.handleLocationChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Input
                    {...getInputProps({
                      className: 'form-control',
                      id: 'text-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Checkbox onClick={e => console.log(e)}>
                    The event's location is TBD
                  </Checkbox>
                </div>
              )}
            </PlacesAutocomplete>
          ) : (
            ''
          )}
        </FormItem>
        <Form.Item
          {...formItemLayout}
          label="Start Time"
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            <DatePicker
              readonly
              //   disabled={
              //     createdEvent.eventStatus === 'live' && createdEvent.tickets
              //   }
              {...getFieldProps('createdEventForm.startDate', {
                rules: [
                  {
                    required: true,
                    message: 'Please select the correct date!',
                  },
                ],
              })}
            />
          </Form.Item>
          <span
            style={{
              display: 'inline-block',
              width: '24px',
              textAlign: 'center',
            }}
          >
            -
          </span>
          <FormItem
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            <TimePicker
              //   disabled={
              //     createdEvent.eventStatus === 'live' && createdEvent.tickets
              //   }
              {...getFieldProps('createdEventForm.startTime', {
                getValueFromEvent: e => {
                  const momento = getFieldValue('createdEventForm.startDate');
                  if (moment.isMoment(momento)) {
                    e.set('year', momento.year());
                    e.set('month', momento.month());
                    e.set('date', momento.date());
                    console.log(e);
                  }
                  setFieldsValue({ 'createdEventForm.startDate': e });
                  return e;
                },
                rules: [
                  {
                    required: true,
                    message: 'Please input your start time!',
                  },
                ],
              })}
              minuteStep={15}
              allowClear={false}
              use12Hours
              defaultOpenValue={moment('12:00 AM', 'h:mm A')}
              format="h:mm a"
            />
          </FormItem>
        </Form.Item>
        <FormItem
          {...formItemLayout}
          style={{ marginBottom: 0 }}
          label="End Time"
        >
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            <DatePicker
              //   disabled={
              //     createdEvent.eventStatus === 'live' && createdEvent.tickets
              //   }
              {...getFieldProps('createdEventForm.endDate', {
                rules: [
                  {
                    required: true,
                    message: 'Please select the correct date!',
                  },
                ],
              })}
              disabledDate={current => {
                if (!getFieldValue('createdEventForm.startDate')) return '';
                console.log(
                  'startdate',
                  getFieldValue('createdEventForm.startDate'),
                );
                console.log('current', current);
                return (
                  current &&
                  current.valueOf() <
                    getFieldValue('createdEventForm.startDate')
                );
              }}
            />
          </Form.Item>
          <span
            style={{
              display: 'inline-block',
              width: '24px',
              textAlign: 'center',
            }}
          >
            -
          </span>
          <FormItem
            validateStatus={
              getFieldError('createdEventForm.endTime') ? 'error' : ''
            }
            help={
              getFieldError('createdEventForm.endTime')
                ? 'End time must be after start time!'
                : ''
            }
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            <TimePicker
              //   disabled={
              //     createdEvent.eventStatus === 'live' && createdEvent.tickets
              //   }
              {...getFieldProps('createdEventForm.endTime', {
                initialValue: '',
                getValueFromEvent: e => {
                  const momento = getFieldValue('createdEventForm.endDate');
                  console.log(e);
                  console.log(
                    'error?',
                    getFieldError('createdEventForm.endTime'),
                  );
                  if (moment.isMoment(momento)) {
                    e.set('year', momento.year());
                    e.set('month', momento.month());
                    e.set('date', momento.date());
                  }
                  setFieldsValue({ 'createdEventForm.endDate': e });
                  return e;
                },
                rules: [
                  {
                    required: true,
                  },
                  {
                    validator: isBefore,
                  },
                ],
              })}
              minuteStep={15}
              allowClear={false}
              use12Hours
              defaultOpenValue={moment('12:00 AM', 'h:mm A')}
              format="h:mm a"
            />
          </FormItem>
        </FormItem>
        {ReactQuill ? (
          <FormItem {...formItemLayout} label="Event Description">
            {/* <ReactQuill
              value={this.props.formState.description.value}
              name="createdEventForm.description"
              onChange={this.handleChange}
            /> */}
          </FormItem>
        ) : (
          ''
        )}
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Event Organizer&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('createdEventForm.organizer', {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <br />
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Tickets Types &nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {/* <TicketCreation /> */}
        </FormItem>
        <FormItem {...formItemLayout} label="Refundable?">
          {getFieldDecorator('createdEventForm.refundable', {
            getValueFromEvent: e => {
              if (e) return true;
              return false;
            },
          })(<Switch />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Publish?">
          {getFieldDecorator('createdEventForm.eventStatus', {
            getValueFromEvent: e => {
              if (e) return 'live';
              return 'draft';
            },
          })(<Switch />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Event URL"
          validateStatus={getFieldError('createdEventForm.slug') ? 'error' : ''}
          help={
            getFieldError('createdEventForm.slug')
              ? 'That name is unavailable. Please try another one.'
              : ''
          }
        ></FormItem>{' '}
        {/*{getFieldDecorator('createdEventForm.slug', {
            rules: [
              { required: true, message: 'Please input slug!' },
              {
                validator: slugNameAvailable,
              },
            ],
          })( 
          <>
            <div style={{ marginBottom: 16 }}>
          <Input
            style={{ marginBottom: 16 }}
            addonBefore={`${host.split('/')[2]}/e/`}
            addonAfter=".com"
          />,
            </div>
          </>)
          }
        </FormItem> */}
        <FormItem {...formItemLayout} label="Upload Event Image">
          {/* <Upload
            {...getFieldProps('createdEventForm.image', {
              rules: [{ required: true, message: 'Upload event image!' }],
            })}
            image={createdEvent.image}
            saveImage={this.saveImage}
          /> */}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('createdEventForm.agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the{' '}
              <Link href="">
                <a href="">agreement</a>
              </Link>
            </Checkbox>,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {/* {createdEvent._id ? 'Update' : 'Register'} */}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  console.log('mapstate', state.Create.get('title'));
  return {
    // createdEvent: state.createdEvent,
    formState: {
      //   title: state.createdEventForm.title,
      //   startDate: state.createdEventForm.startDate,
      //   endDate: state.createdEventForm.endDate,
      //   startTime: state.createdEventForm.startTime,
      //   location: state.createdEventForm.location,
      //   endTime: state.createdEventForm.endTime,
      //   refundable: state.createdEventForm.refundable,
      //   organizer: state.createdEventForm.organizer,
      //   description: state.createdEventForm.description,
      //   eventStatus: state.createdEventForm.eventStatus,
      //   slug: state.createdEventForm.slug,
    },
  };
};

export default connect(mapStateToProps)(
  createForm({
    onFieldsChange(props, changedFields) {
      // console.log(props.form.getFieldsValue());
      console.log('props', props);
      console.log('changedFields', changedFields);
      props.dispatch({
        type: 'save_fields',
        payload: changedFields,
      });
    },
    mapPropsToFields(props) {
      return {
        // createdEventForm: {
        //   title: createFormField(props.formState.title),
        //   startDate: createFormField(props.formState.startDate),
        //   startTime: createFormField(props.formState.startTime),
        //   endDate: createFormField(props.formState.endDate),
        //   location: createFormField(props.formState.location),
        //   refundable: createFormField(props.formState.refundable),
        //   endTime: createFormField(props.formState.endTime),
        //   organizer: createFormField(props.formState.organizer),
        //   description: createFormField(props.formState.description),
        //   slug: createFormField(props.formState.slug),
        // },
      };
    },
    onValuesChange(_, values) {
      console.log(values);
    },
  })(Create),
);
