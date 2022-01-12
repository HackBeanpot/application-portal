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
import { saveAs } from 'file-saver';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const EditableContext = React.createContext<FormInstance | null>(null);
type SingleRecordType = ApplicantsApiResponse['data'][number];

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

const notifyArg = (message: string) => ({
  placement: 'bottomRight' as const,
  bottom: 50,
  duration: 3,
  message,
});

interface EditableCellProps {
  title: string;
  editable: boolean;
  dataIndex: keyof SingleRecordType;
  record: SingleRecordType;
  mutate: KeyedMutator<ApplicantsApiResponse>;
  options?: Array<{ key: string; value: string }>;
  index: number;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  mutate,
  options,
  index,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useContext(EditableContext)!;

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleIsEditing();
      const updatedRecord = { ...record, ...values };
      // update the cache value so the table displays correct data before fetch returns
      await mutate((response) => {
        if (!response) return response;
        response.data[index] = updatedRecord;
        return { ...response, data: [...response.data] };
      }, true);
      await updateApplicantById(record._id, updatedRecord);
      notification.success(
        notifyArg(`Successfully updated application status for ${record.email}`)
      );
    } catch (e) {
      notification.error(notifyArg('Request to change application status failed.'));
    }
  };

  let childNode = children;
  if (editable) {
    if (isEditing) {
      childNode = (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Select onChange={save}>
            {options?.map(({ key, value }) => (
              <Option key={key} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    } else {
      childNode = (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleIsEditing}
        >
          {children}
        </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

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
