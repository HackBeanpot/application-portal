import React, { useState } from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { getAllApplicants } from '../../common/apiClient';
import useSWR from 'swr';
import { Button, Table, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import {
  ApplicantsApiResponse,
  ApplicationStatus,
  Dropdown as DropdownQuestionType,
  RSVPStatus,
} from '../../common/types';
import { Questions } from '../../common/questions';
import { saveAs } from 'file-saver';
import { EditableRow } from './table/EditableRow';
import { EditableCell, EditableCellProps } from './table/EditableCell';

export type SingleRecordType = ApplicantsApiResponse['data'][number];

// table columns: name, email, school, application status, rsvp status
const columns = [
  {
    title: 'Name',
    dataIndex: ['responses', '0'],
    sorter: true,
    editable: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
    editable: false,
  },
  {
    title: 'School',
    dataIndex: ['responses', '4'],
    filters: (Questions[4] as DropdownQuestionType).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    render: (_: string, record: SingleRecordType) =>
      record.responses?.[record.responses[4] === 'Other' ? 5 : 4] ?? '',
    sorter: true,
    editable: false,
  },
  {
    title: 'Year',
    dataIndex: ['responses', '7'],
    filters: (Questions[7] as DropdownQuestionType).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    sorter: true,
    editable: false,
  },
  {
    title: 'Application Status',
    dataIndex: 'applicationStatus',
    filters: Object.values(ApplicationStatus).map((value) => ({
      text: value,
      value,
    })),
    sorter: true,
    editable: true,
    options: Object.values(ApplicationStatus).map((value: string) => ({ key: value, value })),
  },
  {
    title: 'Rsvp Status',
    dataIndex: 'rsvpStatus',
    filters: Object.values(RSVPStatus).map((value) => ({
      text: value,
      value,
    })),
    sorter: true,
    editable: true,
    options: Object.values(RSVPStatus).map((value: string) => ({ key: value, value })),
  },
];

type TableOnChange = NonNullable<TableProps<SingleRecordType>['onChange']>;
export type TableFilters = Parameters<TableOnChange>['1'];
export type TableSorter = Parameters<TableOnChange>['2'];

const getAllApplicantsForSwr = (
  _: string,
  pagination: TablePaginationConfig,
  filters: TableFilters,
  sorter: TableSorter
) => getAllApplicants(pagination, filters, sorter).then((axiosReq) => axiosReq.data);

const Applicants: React.FC = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<TableFilters>({});
  const [sorter, setSorter] = useState<TableSorter>({});
  const { data, mutate } = useSWR(
    [`/api/v1/applicants`, pagination, filters, sorter],
    getAllApplicantsForSwr
  );
  const [exporting, setExporting] = useState(false);
  const onExportClick = () => {
    if (!data) {
      return;
    }
    setExporting(true);
    downloadFile(data.totalCount, filters, sorter).then(() => setExporting(false));
  };

  const onChange: TableProps<SingleRecordType>['onChange'] = (pagination, filters, sorter) => {
    setSorter(sorter);
    setPagination(pagination);
    setFilters(filters);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns2 = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: SingleRecordType, index?: number): EditableCellProps => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex as keyof SingleRecordType,
        title: col.title,
        mutate,
        options: col.options,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        index: index!,
      }),
    };
  });

  return (
    <div className={'applicants'}>
      <div className="title-container">
        <h3>{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
        <Tooltip overlay={'Data exports respect currently applied filter and sort.'}>
          <Button
            className="export-button"
            type="primary"
            loading={!data || exporting}
            onClick={onExportClick}
          >
            Export All Data
          </Button>
        </Tooltip>
      </div>
      <Table
        size={'small'}
        className={'applicants'}
        columns={columns2}
        components={components}
        rowKey={(record) => record.email}
        dataSource={data?.data ?? []}
        pagination={{
          ...pagination,
          total: data?.totalCount,
          position: ['topLeft', 'bottomRight'],
          showTotal: (t) => `${t} results`,
        }}
        loading={!data}
        onChange={onChange}
      />
      <div className={'filler'} />
    </div>
  );
};

const escaper = (s: string) => `"${s.replaceAll('"', '""')}"`;
const separator = ',';
const fileName = 'applicants.csv';
const downloadFile = async (totalCount: number, filters: TableFilters, sorter: TableSorter) => {
  const pagination: TablePaginationConfig = {
    current: 1,
    pageSize: totalCount,
  };
  const data = await getAllApplicants(pagination, filters, sorter);
  const rowHeadersText = [
    'email',
    'isAdmin',
    'applicationStatus',
    'rsvpStatus',
    ...Questions.map((q) => q.field),
  ]
    .map(escaper)
    .join(separator);
  const rowCellsText = data.data.data
    .map((user) => {
      let segments = [
        user.email,
        String(user.isAdmin),
        String(user.applicationStatus),
        String(user.rsvpStatus),
      ];
      const responses = user.responses;
      if (responses) {
        segments = [
          ...segments,
          ...Questions.map((q, idx) => {
            const response = responses[idx];
            if (Array.isArray(response)) {
              return response.join('\n');
            }
            return response ?? '';
          }),
        ];
      }
      return segments.map(escaper).join(separator);
    })
    .join('\n');
  const fileText = `${rowHeadersText}\n${rowCellsText}`;
  const blob = new Blob([fileText], { type: 'data:text/csv;charset=utf-8' });
  saveAs(blob, fileName);
  return null;
};

export default Applicants;
