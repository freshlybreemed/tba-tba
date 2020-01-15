/* eslint-disable react/react-in-jsx-scope */
import {
  Archive,
  Bell,
  BarChart,
  Tv,
  Bookmark,
  DollarSign,
  Eye,
  Menu,
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
  Divider,
  Dropdown,
  Empty,
  Icon,
  List,
  message,
  Modal,
  Progress,
  Row,
  Statistic,
  Switch,
  Table,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
  XYPlot,
  LineSeries,
  Crosshair,
} from 'react-vis';
import { Component } from 'react';
import { withRouter } from 'next/router';
import IsoWidgetsWrapper from '../Widgets/widgets-wrapper';
import StickerWidget from '../Widgets/sticker/sticker-widget';
import basicStyle from '../../config/basicStyle';
import IntlMessages from '../../components/utility/intlMessages';
import ContentHolder from '../../components/utility/contentHolder';
import Box from '../../components/utility/box';

import Link from 'next/link';
import NoSSR from 'react-no-ssr';
//   import PostCard from "./shared/PostCard";
//   import TeamMemberCreation from "./TeamMemberCreation";
import StatCard from '../../components/manage/statCard';
// import WeatherCard from "./shared/WeatherCard";
import styled from 'styled-components';
// import { theme } from "./styles/GlobalStyles";
import { getTime, formatPrice } from '../../helpers/utility';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
//   import { AUTH_CONFIG } from "../lib/auth0-variables";

//   const host = AUTH_CONFIG.host;

const { Paragraph, Title, Text } = Typography;

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

const getPercentage = event => {
  let total = 0;
  let sold = 0;
  for (var ticketType in event.ticketTypes) {
    if (parseInt(event.ticketTypes[ticketType].currentQuantity) === 0) {
      sold += parseInt(event.ticketTypes[ticketType].startingQuantity);
    } else {
      sold +=
        parseInt(event.ticketTypes[ticketType].startingQuantity) -
        parseInt(event.ticketTypes[ticketType].currentQuantity);
    }
    total += parseInt(event.ticketTypes[ticketType].startingQuantity);
  }
  return parseInt((sold / total) * 100);
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
    render: (total, order) => {
      return `$${total}`;
    },
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

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  .rv-discrete-color-legend {
    display: inline-block;
    width: auto !important;
  }
  .rv-discrete-color-legend-item {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

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

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
      visible: false,
    };
  }
  componentWillMount = () => {
    console.log(this.props);
    this.salesData();
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
          if (ticket.metadata.status === 'refunded') continue;
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
    this.setState({
      ticketDayCount,
      totalTicketCount,
      totalBalance: totalBalance.toFixed(2),
    });
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    this.setState({ visible: false });
  };
  renderTicketTypes = () => {
    let ticketTypes = this.props.event.ticketTypes;
    const tickets = Object.keys(ticketTypes);
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
      boxShadow: 'none',
    };
    return tickets.map(type => {
      const percentage = parseInt(
        (
          (1 -
            ticketTypes[type].currentQuantity /
              ticketTypes[type].startingQuantity) *
          100
        )
          .toString()
          .split('.')[0],
      );
      return (
        <div style={gridStyle}>
          <Text strong>{ticketTypes[type].name}</Text>
          <br />
          <Progress type='circle' percent={percentage} width={80} />
          <br />
          <Text>
            {`${ticketTypes[type].currentQuantity}/${ticketTypes[type].startingQuantity}`}{' '}
            available
          </Text>
        </div>
      );
    });
  };

  renderRecentOrders = () => {
    let recentOrders = [];

    const capitalize = text => {
      if (!text) return '';
      return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    const { event } = this.props;
    let count = 0;
    for (let order in event.tickets) {
      const person = event.tickets[order];
      const date = new Date(person.created * 1000).toString();
      recentOrders.push({
        key: String(person.created).substring(5),
        name: `${capitalize(person.metadata.firstName)} ${capitalize(
          person.metadata.lastName,
        )}`,
        age: getTixQuantity(person.metadata),
        date: getTime(date, 'date'),
        total: person.amount_refunded
          ? `-(${(person.amount / 100).toFixed(2)})`
          : `${(person.amount / 100).toFixed(2)}`,
        eventId: event._id,
      });
      count++;
      if (count > 6) break;
    }
    return recentOrders;
  };
  renderGraph = () => {
    return [];
    var dateArray = new Array();
    if (this.props.event.tickets) {
      let render = this.props.event.tickets.map(order => {
        return {
          x: new Date(
            `${new Date(order.created * 1000).getMonth().toString()}/${new Date(
              order.created * 1000,
            )
              .getDate()
              .toString()}/${new Date(order.created * 1000)
              .getFullYear()
              .toString()}`,
          ),
          y: (order.amount - order.amount_refunded) / 100,
        };
      });
      const days = {};
      render.forEach((item, index, object) => {
        days[item.x] = days[item.x] ? days[item.x] + item.y : item.y;
      });
      let graph = [];
      for (var day in days) {
        graph.push({
          x: new Date(day),
          y: days[day],
        });
      }
      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      for (var metric in graph) {
        dateArray.push(graph[metric]);
        const metrica = parseInt(metric) + 1;
        if (graph[metrica]) {
          var currentDate = graph[metrica].x;
          const array = [];
          while (currentDate < graph[metric].x) {
            currentDate = currentDate.addDays(1);
            if (currentDate.getTime(date) !== graph[metric].x.getTime()) {
              array.push({
                x: new Date(currentDate),
                y: 0,
              });
            }
          }
          dateArray = dateArray.concat(array.reverse());
        }
      }
    }
    return [dateArray];
  };
  onNearestX = (value, { index }) => {
    this.setState({ crosshairValues: this.renderGraph().map(d => d[index]) });
  };
  onMouseLeave = () => {
    this.setState({ crosshairValues: [] });
  };
  render = () => {
    console.log('props', this.props);
    const { event } = this.props;
    const { rowStyle, colStyle } = basicStyle;

    const { visible } = this.state;
    const customizeRenderEmpty = type => (
      <>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={`No ${type} Yet`}
        />
        {type === 'Payouts' ? <Button>Setup Payouts</Button> : ''}
      </>
    );

    return (
      <>
        <Title level={3}>{event.title}</Title>
        <a href={`/e/${event.slug}`}>
          <Eye size='20' color={`black`} />
        </a>
        <Paragraph copyable>{`/e/${event.slug}`}</Paragraph>
        <Row style={rowStyle} gutter={0} justify='start'>
          <Col md={6} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={this.state.totalTicketCount.toString()}
                text={`Tixs Sold`}
                icon='ion-android-camera'
                fontColor='#ffffff'
                bgColor='#42A5F6'
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col md={6} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={`${formatPrice(this.state.totalBalance)}`}
                text={`Balance`}
                icon='ion-cash'
                fontColor='#ffffff'
                bgColor='#7ED320'
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col md={6} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={`${this.state.ticketDayCount} 
                ${
                  this.state.ticketDayCount === 0 ||
                  this.state.ticketDayCount > 1
                    ? ' Tickets'
                    : ' Ticket'
                }`}
                text={`24-Hour Sales`}
                icon='ion-pricetag'
                fontColor='#ffffff'
                bgColor='#F75D81'
              />
            </IsoWidgetsWrapper>
          </Col>
          <Col md={6} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={870}
                text={`Pageviews`}
                icon='ion-eye'
                fontColor='#ffffff'
                bgColor='#7266BA'
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
        <Box
          title={`Recent Orders`}
          subtitle={<IntlMessages id='forms.input.basicSubTitle' />}
        >
          <ContentHolder>
            <ConfigProvider renderEmpty={() => customizeRenderEmpty('Sales')}>
              <Table
                columns={isMobile ? ordersMobileColumns : ordersDesktopColumns}
                {...{ pagination: false }}
                dataSource={this.renderRecentOrders()}
              />
            </ConfigProvider>
          </ContentHolder>
        </Box>
        {/* <Card title="Payouts">
                  <ConfigProvider renderEmpty={() => customizeRenderEmpty('Payouts')}>
                    <Table size="small" {...{pagination: false}} dataSource={[]} columns={isMobile? ordersMobileColumns: payoutsDesktopColumns} />
                  </ConfigProvider>
  
                </Card> */}
        <Box
          title={`Sales by Ticket Type"`}
          subtitle={<IntlMessages id='forms.input.basicSubTitle' />}
        >
          <ContentHolder>{this.renderTicketTypes()} </ContentHolder>
        </Box>
        {/* <Card
          title="Sales analytics"
          extra={
            <Dropdown overlay={menu}>
              <MoreHorizontal
                  size={20}
                  strokeWidth={1}
                  fill={theme.textColor}
                />
            </Dropdown>
          }
          bodyStyle={{ padding: '1rem' }}
          className="mb-4"
        >
          <NoSSR>
            <FlexibleWidthXYPlot
              xType="time"
              onMouseLeave={this.onMouseLeave}
              height={340}
              xDistance={100}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis tickFormat={v => `$${v}`} />
              <LineSeries
                onNearestX={this.onNearestX}
                data={this.renderGraph()[0]}
              />
              <LineSeries data={this.renderGraph()[0]} />
              <Crosshair
                values={this.state.crosshairValues}
                className={'test-class-name'}
              />
            </FlexibleWidthXYPlot>
          </NoSSR>
        </Card>
         */}
        <Row gutter={16}>
          <Col sm={24} md={8} className='mb-4'>
            <Card title='Stats' bodyStyle={{ padding: 0 }}>
              <Row
                type='flex'
                align='middle'
                justify='center'
                gutter={16}
                className='py-4'
              >
                <Progress
                  type='dashboard'
                  percent={getPercentage(event)}
                  width={181}
                  format={percent => (
                    <span className='text-center'>
                      <div
                        css={`
                          display: block;
                          color: #007bff;
                          margin: auto;
                        `}
                      >
                        <GitCommit size={20} strokeWidth={2} />
                      </div>
                      <div
                        className='h5 mb-0'
                        css={`
                          display: block;
                        `}
                      >
                        {percent}
                      </div>
                      <div className='h6'>
                        <small>% tickets sold</small>
                      </div>
                    </span>
                  )}
                />
              </Row>
            </Card>
          </Col>
          <Col sm={24} md={8} className='mb-4'>
            {/* <Card
              title="Tasks"
              extra={
                <Dropdown overlay={menu}>
                  <MoreHorizontal
                      size={20}
                      strokeWidth={1}
                      fill={theme.textColor}
                    />
                </Dropdown>
              }
            >
              <Timeline pending="Tasks pending..." className="mt-2">
                <Timeline.Item>
                  <div className="text-truncate">
                    <TimelinePeriod content="09.45" />
                    <span>Create a services site</span>
                  </div>
                </Timeline.Item>
                <Timeline.Item>
                  <div className="text-truncate">
                    <TimelinePeriod content="11.20" />
                    <span>Solve initial network problems</span>
                  </div>
                </Timeline.Item>
                {/* <Timeline.Item
                    dot={
                      <Server
                        size={16}
                        strokeWidth={1}
                        color={theme.errorColor}
                      />
                    }
                  > 
                    <div className="text-truncate">
                      <TimelinePeriod content="13.00" />
                      <span>Technical testing</span>
                    </div>
                  </Timeline.Item> 
                <Timeline.Item>
                  <div className="text-truncate">
                    <TimelinePeriod content="15.00" />
                    <span>Network problems being solved</span>
                  </div>
                </Timeline.Item>
              </Timeline>
            </Card>
           */}
          </Col>
          <Col sm={24} md={8} className='mb-4'>
            <Card
              title='Team Members'
              // extra={
              //   <Dropdown overlay={menu}>
              //     <MoreHorizontal
              //         size={20}
              //         strokeWidth={1}
              //         fill={theme.textColor}
              //       />
              //   </Dropdown>
              // }
            >
              {/* <TeamMemberCreation /> */}
              <Timeline className='mt-2'>
                <Timeline.Item
                  dot={<Avatar size={24} src='/static/images/face1.jpg' />}
                >
                  <div className='ml-4 text-truncate'>
                    <TimelinePeriod content='9.45' />
                    <span>
                      <a>John Doe</a> launched a new application
                    </span>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={<Avatar size={24} src='/static/images/face2.jpg' />}
                >
                  <div className='ml-4 text-truncate'>
                    <TimelinePeriod content='11.20' />
                    <span>
                      <a>Paula Bean</a> Cleared calendar events
                    </span>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={<Avatar size={24} src='/static/images/face3.jpg' />}
                >
                  <div className='ml-4 text-truncate'>
                    <TimelinePeriod content='13.00' />
                    <span>
                      <a>Peter Hadji</a> Joined your mailing list
                    </span>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={<Avatar size={24} src='/static/images/face4.jpg' />}
                >
                  <div className='ml-4 text-truncate'>
                    <TimelinePeriod content='15.00' />
                    <span>
                      <a>Trevor Belmont</a> Created a new task list
                    </span>
                  </div>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
        </Row>
      </>
    );
  };
}

export default connect()(Manage);
