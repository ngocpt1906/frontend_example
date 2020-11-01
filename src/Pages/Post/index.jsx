import React, { useEffect, useState } from 'react';
import { Button, Table, Drawer, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { MobXProviderContext, observer } from 'mobx-react';
import './style.scss';

const useStores = () => {
  return React.useContext(MobXProviderContext)
}

const Post = observer(() => {

  const { rootStore: { postStore } } = useStores();

  const [visible, setVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});

  const openCreate = () => {
    setSelectItem({
      title: "",
      content: ""
    });
    setVisible(true);
  }

  const openEdit = (post) => {
    setSelectItem(post);
    setVisible(true);
  }

  const handleOnChangeTitle = (event) => {
    setSelectItem({ ...selectItem, ...{ title: event.target.value } });
  }

  const handleOnChangeContent = (event) => {
    setSelectItem({ ...selectItem, ...{ content: event.target.value } });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (text, record) => {
        return <div className="action-wrapper">
          <Button shape="circle" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Button shape="circle" icon={<DeleteOutlined />} onClick={() => postStore.deleteItem(record.id)} />
        </div>
      }
    },
  ];

  useEffect(postStore.getAll, []);

  return (
    <div className="wrap-post">
      <Button onClick={() => { openCreate(true) }}>Create</Button>
      <Table rowKey="id" dataSource={postStore.listItem} columns={columns} />
      <Drawer
        title={selectItem.id ? "Update post" : "Create post"}
        placement="right"
        closable={false}
        onClose={() => {
          setVisible(false)
        }}
        width={480}
        visible={visible}
      >
        <div className="post-form">
          <Input value={selectItem.title} onChange={handleOnChangeTitle}></Input>
          <Input.TextArea value={selectItem.content} rows={20} onChange={handleOnChangeContent}></Input.TextArea>
          <Button onClick={() => {
            if (selectItem.id)
              postStore.updateItem(selectItem.id, selectItem);
            else postStore.createItem(selectItem);
            setVisible(false);
          }}>Save</Button>
        </div>
      </Drawer>
    </div>
  );
})

export default Post;
