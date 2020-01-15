/* eslint-disable react/react-in-jsx-scope */
import {
  Archive,
  Bell,
  BarChart,
  Tv,
  Bookmark,
  DollarSign,
  Edit,
  GitCommit,
  MessageCircle,
  MoreHorizontal,
  PhoneCall,
  Printer,
  Save,
  Server,
  Trash,
  TrendingDown,
  TrendingUp,
} from 'react-feather';
import {
  Avatar,
  Card,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Icon,
  List,
  Menu,
  Modal,
  message,
  Popconfirm,
  Progress,
  Row,
  Statistic,
  Switch,
  Table,
  Tag,
  Timeline,
  Typography,
} from 'antd';

import axios from 'axios';
import { getTime, formatPrice } from '../../helpers/utility';
import ContentHolder from '../../components/utility/contentHolder';
import Box from '../../components/utility/box';

import { Component } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
// import { theme } from './styles/GlobalStyles';
import { isMobile } from 'react-device-detect';
// import { AUTH_CONFIG } from '../lib/auth0-variables';

const host = 'AUTH_CONFIG.host';
const { confirm } = Modal;

const { Paragraph } = Typography;
const { Title, Text } = Typography;

const axes = Array.from(Array(12).keys());

const generate = () => {
  let arr = [];
  axes.map(x => {
    const y = Math.floor(Math.random() * 10) + 1;
    arr.push({ x, y });
  });
  return arr;
};

const getTixQuantity = metadata => {
  let quantity = 0;
  for (let ticketType in metadata) {
    if (
      [
        'firstName',
        'lastName',
        'emailAddress',
        'phoneNumber',
        'eventId',
        'total',
        'status',
        'guestId',
        'title',
      ].indexOf(ticketType) > -1
    )
      continue;
    quantity += parseInt(metadata[ticketType]);
  }
  return quantity;
};

const handleRefund = async (charge, id) => {
  console.log('charging');
  await axios
    .put(`${host}/api/refund/${charge}/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  console.log('charging');
};

const payoutsDesktopColumns = [
  {
    title: 'Initiated On',
    dataIndex: 'key',
    key: 'key',
    render: order => <Link href={`/manage/`}>{order}</Link>,
  },
  {
    title: 'Payout Method',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Est. Arrival',
    dataIndex: 'total',
    key: 'total',
    render: total => `$${total}`,
  },
  {
    title: 'Amount',
    dataIndex: 'total',
    key: 'total',
    render: total => `$${total}`,
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => {
  //     const menu = (
  //       <Menu >
  //         <Menu.Item key={1}><Link href={`/e/${record.slug}`}>Edit</Link></Menu.Item>
  //         <Menu.Item key={2}><Link href={`/manage/${record._id}`}>Invalidate</Link></Menu.Item>
  //         <Menu.Item key={3}><Link href={`/create`}>Refund</Link></Menu.Item>
  //       </Menu>
  //     );
  //     return (
  //       <span>
  //         <Dropdown overlay={menu}>
  //         <Button>
  //           Edit <Icon type="down" />
  //         </Button>
  //         </Dropdown>
  //       </span>
  //     )
  //   }
  // }
];
const ordersDesktopColumns = [
  {
    title: 'Order #',
    dataIndex: 'key',
    key: 'key',
    render: (order, metadata) => (
      <Link href={`/manage/${metadata.eventId}/order/${order}`}>{order}</Link>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: total => `$${total}`,
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => {
  //     const menu = (
  //       <Menu >
  //         <Menu.Item key={1}><Link href={`/e/${record.slug}`}>Edit</Link></Menu.Item>
  //         <Menu.Item key={2}><Link href={`/manage/${record._id}`}>Invalidate</Link></Menu.Item>
  //         <Menu.Item key={3}><Link href={`/create`}>Refund</Link></Menu.Item>
  //       </Menu>
  //     );
  //     return (
  //       <span>
  //         <Dropdown overlay={menu}>
  //         <Button>
  //           Edit <Icon type="down" />
  //         </Button>
  //         </Dropdown>
  //       </span>
  //     )
  //   }
  // }
];
const ordersMobileColumns = [
  // {
  //   title: '#',
  //   dataIndex: 'key',
  //   key: 'key',
  //   render: text => <a href="javascript:;">{text}</a>
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      const menu = (
        <Menu>
          <Menu.Item key={`/e/${event.slug}`}>
            <Link href={`/e/${event.slug}`}>Edit</Link>
          </Menu.Item>
          <Menu.Item key={`/manage/${event._id}`}>
            <Link href={`/manage/${event._id}`}>Invalidate</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link href={`/create`}>Refund</Link>
          </Menu.Item>
        </Menu>
      );
      return (
        <span>
          <Dropdown overlay={menu}>
            <Button>
              Edit <Icon type='down' />
            </Button>
          </Dropdown>
        </span>
      );
    },
  },
];

const series = [
  {
    title: 'Views',
    data: generate(),
  },
  {
    title: 'Sales',
    data: generate(),
  },
];

const menu = (
  <Menu>
    <Menu.Item>
      <Row type='flex' align='middle'>
        <Archive size={16} strokeWidth={1} className='mr-3' />{' '}
        <span>Archive</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type='flex' align='middle'>
        <Edit size={16} strokeWidth={1} className='mr-3' /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type='flex' align='middle'>
        <Trash size={16} strokeWidth={1} className='mr-3' /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type='flex' align='middle'>
        <Save size={16} strokeWidth={1} className='mr-3' /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type='flex' align='middle'>
        <Printer size={16} strokeWidth={1} className='mr-3' />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const TimelinePeriod = ({ content }) => (
  <small
    className='text-muted'
    css={`
      display: block;
    `}
  >
    {content}
  </small>
);

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  componentWillMount = () => {
    console.log(this.props);
    // this.salesData();
  };

  salesData = () => {
    var date = new Date().getTime() / 1000;
    var yesterday = date - 86400;
    var ticketDayCount = 0;
    let totalBalance = 0;
    let ticketTypes = this.props.event.ticketTypes;
    var totalTicketCount = 0;
    if (typeof this.props.event.tickets !== 'undefined') {
      this.props.event.tickets.forEach(ticket => {
        for (let ticketType in ticket.metadata) {
          if (
            [
              'firstName',
              'lastName',
              'emailAddress',
              'phoneNumber',
              'updatedAt',
              'eventId',
              'total',
              'status',
              'guestId',
              'title',
            ].indexOf(ticketType) > -1
          )
            continue;
          totalTicketCount += parseInt(ticket.metadata[ticketType]);
          totalBalance +=
            ticketTypes[ticketType].price *
            parseInt(ticket.metadata[ticketType]);
          if (ticket.created > yesterday && ticket.created < date) {
            ticketDayCount += parseInt(ticket.metadata[ticketType]);
          }
        }
      });
    }
    this.setState(
      {
        ticketDayCount,
        totalTicketCount,
        totalBalance: totalBalance.toFixed(2),
      },
      () => console.log(this.state),
    );
  };
  render = () => {
    const { event, customer } = this.props;
    console.log('this.props', this.props);
    const customizeRenderEmpty = type => (
      <>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={`No ${type} Yet`}
        />
        {type === 'Payouts' ? <Button>Setup Payouts</Button> : ''}
      </>
    );
    var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(customer.created);
    const menu = (
      <Menu>
        <Menu.Item key={0}>
          <a>Edit Info</a>
        </Menu.Item>

        <Menu.Item key={1}>
          <Popconfirm title='Are you sure？' okText='Yes' cancelText='No'>
            <a href='#'>Refund</a>
          </Popconfirm>
        </Menu.Item>
        <Menu.Item key={1}>
          <a>Transfer</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <Title level={3}>{event.title}</Title>

        <Row gutter={16}>
          <Box
            title={`Order Details (#${customer.created
              .toString()
              .slice(-5)}) ${formatPrice(customer.metadata.total)}`}
            // subtitle={<IntlMessages id='forms.input.basicSubTitle' />}
          >
            <ContentHolder>
              <Paragraph>{`Completed (Delivery method: eTicket)`}</Paragraph>
              <Paragraph>{`Purchased by ${customer.metadata.firstName} ${
                customer.metadata.lastName
              } (${customer.metadata.emailAddress}) on ${getTime(
                date,
                'full',
              )} `}</Paragraph>
              <Descriptions>
                <Descriptions.Item label='First Name'>{`${customer.metadata.firstName}`}</Descriptions.Item>
                <Descriptions.Item label='Last Name'>{`${customer.metadata.lastName}`}</Descriptions.Item>
                <Descriptions.Item label='Email Address'>{`${customer.metadata.emailAddress}`}</Descriptions.Item>
                <Descriptions.Item label='Status'>{`${customer.metadata.status}`}</Descriptions.Item>
                {/* <Descriptions.Item label='Email Status'>{`${
                customer.guestInfo[0].dispatched_at
                  ? `Sent @ ${getTime(
                      customer.guestInfo[0].dispatched_at,
                      'full',
                    )}`
                  : 'Not Sent Yet'
              }`}</Descriptions.Item> */}
              </Descriptions>
              <span>
                <Button
                  onClick={() => {
                    confirm({
                      title: 'Are you sure refund this ticket?',
                      content: `Refund amount: ${formatPrice(
                        customer.metadata.total,
                      )}`,
                      okText: 'Yes',
                      okType: 'danger',
                      cancelText: 'No',
                      onOk() {
                        console.log('OK');
                        handleRefund(customer.id, event._id);
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                  }}
                  style={{ marginRight: 8 }}
                >
                  Refund
                </Button>
                <Drawer
                  width={720}
                  onClose={this.onClose}
                  visible={this.state.visible}
                >
                  Fuck
                </Drawer>
                <Button onClick={this.showDrawer} style={{ marginRight: 8 }}>
                  Edit Info
                </Button>
                <Button style={{ marginRight: 8 }}>Resend Ticket</Button>
              </span>
            </ContentHolder>
          </Box>
        </Row>
      </>
    );
  };
}

export default Order;
