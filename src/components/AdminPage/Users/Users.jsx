import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";

const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Activity 0",
      Co2_Emission: "10",
      Category: "Food",
    },
    {
      key: "1",
      name: "Activity 1",
      Co2_Emission: "32",
      Category: "House",
    },
  ]);
  const [count, setCount] = useState(2);
  const [selectedItem, setSelectedItem] = useState("");

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    if (selectedItem) {
      const newData = {
        key: count.toString(),
        name: selectedItem,
        Co2_Emission: "20",
        Category: `Food`,
      };
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
      setSelectedItem("");
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      width: "30%",
      editable: true,
      render: (_, record) => record.name,
    },
    {
      title: "Co2_Emission",
      dataIndex: "Co2_Emission",
    },
    {
      title: "Category",
      dataIndex: "Category",
    },
    {
      title: "Operation",
      dataIndex: "Operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSelectChange = (value) => {
    setSelectedItem(value);
  };

  return (
    <div>
      <Select
        style={{ width: 200, marginRight: 16 }}
        value={selectedItem}
        onChange={(value) => handleSelectChange(value)}
      >
        <Option value="Activity 2">Activity 2</Option>
        <Option value="Activity 3">Activity 3</Option>
        <Option value="Activity 4">Activity 4</Option>
      </Select>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add activity
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default App;
