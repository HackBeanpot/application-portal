import React, { useEffect, useState } from 'react';
import { ADMIN_TABS, EXAMPLE_USER } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR, { useSWRInfinite } from 'swr';
import ApplicantRow from './ApplicantRow';
import { Table, TablePaginationConfig, TableProps } from 'antd';
import { User } from '../../common/types';

// table columns: name, email, school, application status
const columns = [
  {
    title: 'Name',
    dataIndex: ['responses', '0'],
    sorter: true,
    // render: name => `${name.first} ${name.last}`,
    // width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    // width: '20%',
  },
  {
    title: 'School',
    dataIndex: ['responses', '4'],
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
  },
  {
    title: 'Application Status',
    dataIndex: 'applicationStatus',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
  },
  {
    title: 'Year',
    dataIndex: ['responses', '7'],
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
  },
];

const getRandomuserParams = (params: any) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

type TableOnChange = NonNullable<TableProps<User>['onChange']>;
type TableFilters = Parameters<TableOnChange>['1'];
type TableSorter = Parameters<TableOnChange>['2'];
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
  const { data, isValidating } = useSWR(
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
    <div>
      <h3>{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <Table
        columns={columns}
        rowKey={(record) => record.email}
        dataSource={data?.data ?? []}
        pagination={pagination}
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
