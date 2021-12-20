import React, { useState } from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR from 'swr';
import { Table, TablePaginationConfig, TableProps } from 'antd';
import { ApplicationStatus, Dropdown, User } from '../../common/types';
import { Questions } from '../../common/questions';

// table columns: name, email, school, application status
const columns = [
  {
    title: 'Name',
    dataIndex: ['responses', '0'],
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true
  },
  {
    title: 'School',
    dataIndex: ['responses', '4'],
    filters: (Questions[4] as Dropdown).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    render: (text: any, record: User) =>
      record.responses &&
      (record.responses[4] === 'Other'
        ? record.responses[5]
        : record.responses[4]),
    sorter: true
  },
  {
    title: 'Application Status',
    dataIndex: 'applicationStatus',
    filters: Object.values(ApplicationStatus).map((value) => ({
      text: value,
      value,
    })),
    sorter: true
  },
  {
    title: 'Year',
    dataIndex: ['responses', '7'],
    filters: (Questions[7] as Dropdown).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    sorter: true
  },
];

type TableOnChange = NonNullable<TableProps<User>['onChange']>;
export type TableFilters = Parameters<TableOnChange>['1'];
export type TableSorter = Parameters<TableOnChange>['2'];

const Applicants: React.FC = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<TableFilters>({});
  const [sorter, setSorter] = useState<TableSorter>({});
  const { data } = useSWR(
    [`/api/v1/applicants`, pagination, filters, sorter],
    getAllApplicants
  );

  const onChange: TableProps<User>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setSorter(sorter);
    setPagination(pagination);
    setFilters(filters);
  };

  return (
    <div className={"applicants"}>
      <h3>{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <Table
        size={"small"}
        className={"applicants"}
        columns={columns}
        rowKey={(record) => record.email}
        dataSource={data?.data.data ?? []}
        pagination={{
          ...pagination,
          total: data?.data.totalCount,
          position: ['topLeft', 'bottomRight'],
          showTotal: (t) => `${t} results`,
        }}
        loading={!data}
        onChange={onChange}
      />
      <div className={"filler"}/>
    </div>
  );
};
export default Applicants;
