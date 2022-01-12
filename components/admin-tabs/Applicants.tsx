import React, { useContext, useState } from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { getAllApplicants, updateApplicantById } from '../../common/apiClient';
import useSWR, { KeyedMutator } from 'swr';
import {
  Table,
  TablePaginationConfig,
  TableProps,
  Form,
  Select,
  notification,
  Tooltip,
  Button,
} from 'antd';
import {
  ApplicationStatus,
  Dropdown as DropdownQuestionType,
  RSVPStatus,
  ApplicantsApiResponse,
} from '../../common/types';
import { Questions } from '../../common/questions';
import { FormInstance } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';
import { saveAs } from 'file-saver';
import { AxiosResponse } from 'axios';

const { Option } = Select;
const EditableContext = React.createContext<FormInstance | null>(null);
type SingleRecordType = ApplicantsApiResponse['data'][0];

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: SingleRecordType;
  mutate: KeyedMutator<AxiosResponse<ApplicantsApiResponse>>;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  mutate,
  ...restProps
}) => {
  const [editingApplicationStatus, setEditingApplicationStatus] = useState(false);
  const [editingRSVPStatus, setEditingRSVPStatus] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleEditApplicationStatus = (dataIndex: string) => {
    setEditingApplicationStatus(!editingApplicationStatus);
    form.setFieldsValue({ [dataIndex]: record.applicationStatus });
    return undefined;
  };

  const toggleEditRsvpStatus = (dataIndex: string) => {
    setEditingRSVPStatus(!editingRSVPStatus);
    form.setFieldsValue({ [dataIndex]: record.rsvpStatus });
    return undefined;
  };

  const notifyArg = (message: string) => ({
    placement: 'bottomRight' as const,
    bottom: 50,
    duration: 3,
    message,
  });
  const successNotify = (msg: string) => notification.success(notifyArg(msg));
  const errorNotify = (msg: string) => notification.error(notifyArg(msg));

  const changeApplicationStatus = async (status: SelectValue, record: SingleRecordType) => {
    const updatedUser = { ...record, applicationStatus: status as ApplicationStatus };
    try {
      await updateApplicantById(record._id ?? '', updatedUser);
      successNotify(
        'Successfully changed application status for ' +
          (record.responses ? record.responses[0] : 'user')
      );
      await mutate();
    } catch (error) {
      errorNotify('Request to change application status failed.');
    }
  };

  const changeRsvpStatus = async (status: SelectValue, record: SingleRecordType) => {
    const updatedUser = { ...record, rsvpStatus: status as RSVPStatus };
    try {
      await updateApplicantById(record._id ?? '', updatedUser);
      successNotify(
        'Successfully changed RSVP status for ' + (record.responses ? record.responses[0] : 'user')
      );
      mutate();
    } catch (error) {
      errorNotify('Request to change RSVP status failed.');
    }
  };

  let childNode = children;

  if (editable) {
    childNode =
      editingApplicationStatus || editingRSVPStatus ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            onChange={(e) =>
              dataIndex === 'applicationStatus'
                ? changeApplicationStatus(e, record)
                : changeRsvpStatus(e, record)
            }
          >
            {Object.values(dataIndex === 'applicationStatus' ? ApplicationStatus : RSVPStatus).map(
              (status, index) => (
                <Option value={status} key={index}>
                  {status}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={
            dataIndex === 'applicationStatus'
              ? toggleEditApplicationStatus(dataIndex)
              : toggleEditRsvpStatus(dataIndex)
          }
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

// table columns: name, email, school, application status, rsvp status
let columns = [
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
    render: (text: any, record: SingleRecordType) =>
      record.responses &&
      (record.responses[4] === 'Other' ? record.responses[5] : record.responses[4]),
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
) => getAllApplicants(pagination, filters, sorter);

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
    downloadFile(data.data.totalCount, filters, sorter).then(() => setExporting(false));
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

  columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: SingleRecordType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        mutate,
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
        columns={columns}
        components={components}
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
