import React from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { Table } from 'antd';

const data = [
  { key: '01', name: 'Total', value: 250 },
  { key: '02', name: 'Verified', value: 100 },
  { key: '03', name: 'Submitted', value: 150 },
  { key: '04', name: 'Admitted', value: 140 },
  { key: '05', name: 'Confirmed', value: 150 },
  { key: '06', name: 'Declined', value: 150 },
  { key: '07', name: 'Checked in', value: 150 },
  { key: '08', name: 'T-Shirt XS', value: 20 },
  { key: '09', name: 'T-Shirt S', value: 20 },
  { key: '10', name: 'T-Shirt M', value: 20 },
  { key: '11', name: 'T-Shirt L', value: 20 },
  { key: '12', name: 'T-Shirt XL', value: 20 },
  { key: '13', name: 'Year 1', value: 20 },
  { key: '14', name: 'Year 2', value: 20 },
  { key: '15', name: 'Year 3', value: 20 },
  { key: '16', name: 'Year 4', value: 20 },
  { key: '17', name: 'Year 5', value: 20 },
  { key: '18', name: 'Year 5+', value: 20 },
];

const columns = [
  {
    key: '1',
    title: 'Stat',
    dataIndex: 'name',
  },
  {
    key: '2',
    title: 'Value',
    dataIndex: 'value',
  },
];

const Stats = () => {
  return (
    <div>
      <h3>{ADMIN_TABS.VIEW_STATS}</h3>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};
export default Stats;
