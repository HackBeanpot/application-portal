import React, { useEffect, useState } from 'react';
import { ADMIN_TABS, EXAMPLE_USER } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR, { useSWRInfinite } from 'swr';
import ApplicantRow from './ApplicantRow';
import { Pagination, Table, TablePaginationConfig, TableProps } from 'antd';
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
  },
  {
    title: 'Application Status',
    dataIndex: 'applicationStatus',
    filters: Object.values(ApplicationStatus).map((value) => ({
      text: value,
      value,
    })),
  },
  {
    title: 'Year',
    dataIndex: ['responses', '7'],
    filters: (Questions[7] as Dropdown).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
  },
];

const getRandomuserParams = (params: any) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

type TableOnChange = NonNullable<TableProps<User>['onChange']>;
export type TableFilters = Parameters<TableOnChange>['1'];
export type TableSorter = Parameters<TableOnChange>['2'];
type TableConfig = {
  pagination: TablePaginationConfig;
  filters: TableFilters;
  sorter: TableSorter;
};

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
    <div className="admin">
      <h3>{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <Table
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
      {/*<table>*/}
      {/*  <thead>*/}
      {/*    <tr>*/}
      {/*      <th>First name</th>*/}
      {/*      <th>Last name</th>*/}
      {/*      <th>Email</th>*/}
      {/*      <th>School</th>*/}
      {/*      <th>Year</th>*/}
      {/*      <th>Application Status</th>*/}
      {/*      <th>Edit</th>*/}
      {/*      <th>Update</th>*/}
      {/*    </tr>*/}
      {/*  </thead>*/}
      {/*  <tbody>*/}
      {/*    {applicants?.data?.map((a) => (*/}
      {/*      <ApplicantRow applicant={a} key={a.email} />*/}
      {/*    ))}*/}
      {/*  </tbody>*/}
      {/*</table>*/}
    </div>
  );
};
export default Applicants;
