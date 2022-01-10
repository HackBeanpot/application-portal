import React, {
  useContext,
  useState,
  useRef
} from 'react';
import { ADMIN_TABS } from '../../common/constants';
import { getAllApplicants, updateApplicantById } from '../../common/apiClient';
import useSWR from 'swr';
import { Table, TablePaginationConfig, TableProps, Form, Select } from 'antd';
import {
  ApplicationStatus,
  Dropdown as DropDown,
  User,
  RSVPStatus
} from '../../common/types';
import { Questions } from '../../common/questions';
import { FormInstance } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;
const EditableContext = React.createContext<FormInstance<any> | null>(null);

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
  record: User;
  handleSave: (record: User) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editingApplicationStatus, setEditingApplicationStatus] = useState(false);
  const [editingRSVPStatus, setEditingRSVPStatus] = useState(false);
  const selectRef = useRef<typeof Select>(null);

  const toggleEditApplicationStatus = () => {
    setEditingApplicationStatus(!editingApplicationStatus);
  };

  const toggleEditRsvpStatus = () => {
    setEditingRSVPStatus(!editingRSVPStatus);
  };

  const changeApplicationStatus = async (status: SelectValue, record: User) => {
    const updatedUser = { ...record, applicationStatus: status as ApplicationStatus };
    updateApplicantById(record._id ?? '', updatedUser);
  };

  const changeRsvpStatus = async (status: SelectValue, record: User) => {
    const updatedUser = { ...record, rsvpStatus: status as RSVPStatus };
    updateApplicantById(record._id ?? '', updatedUser);
  };

  let childNode = children;

  if (editable) {
    childNode = editingApplicationStatus || editingRSVPStatus ? (
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
          ref={selectRef}
          onChange={(e) =>
            dataIndex === 'applicationStatus'
              ? changeApplicationStatus(e, record)
              : changeRsvpStatus(e, record)
          }
        >
          {Object.values(dataIndex === 'applicationStatus' ? ApplicationStatus : RSVPStatus).map(
            (status) => (
              <Option value={status}>{status}</Option>
            )
          )}
        </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={dataIndex === 'applicationStatus' ? toggleEditApplicationStatus : toggleEditRsvpStatus}
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
    filters: (Questions[4] as DropDown).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    render: (text: any, record: User) =>
      record.responses &&
      (record.responses[4] === 'Other' ? record.responses[5] : record.responses[4]),
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
    title: 'Year',
    dataIndex: ['responses', '7'],
    filters: (Questions[7] as DropDown).options.map(({ name }) => ({
      text: name,
      value: name,
    })),
    sorter: true,
    editable: false,
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
  const { data } = useSWR([`/api/v1/applicants`, pagination, filters, sorter], getAllApplicants);

  const onChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
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
      onCell: (record: User) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div className={'applicants'}>
      <h3>{ADMIN_TABS.VIEW_AND_MODIFY_APPLICANTS}</h3>
      <Table
        size={'small'}
        className={'applicants'}
        components={components}
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
      <div className={'filler'} />
    </div>
  );
};
export default Applicants;
