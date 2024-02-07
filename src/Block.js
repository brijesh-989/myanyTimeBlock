import React, { useState } from 'react';
import { Input, Button, Modal, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Block = ({ id, index, type, data, onRemove, onDragEnd, onDragStart, onDragOver, onHandleBlock, onHandleBlockImage }) => {
    const [isEditing, setEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleEdit = () => {
        setEditing(true);
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleSave = () => {
        setEditing(false);
        onDragEnd(index);
    };

    const handleCancel = () => {
        setEditing(false);
    };
    const handleImage = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
        onHandleBlockImage(index, imageUrl);
    }

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => {
                onDragOver(e, index);
            }}
            onDragEnd={handleSave}
        >
            <div className="block" onClick={(e) => e.stopPropagation()}>
                {type === 'text' ? (
                    <div>
                        {isEditing ? (
                            <div>
                                <TextArea
                                    value={data}
                                    onChange={(e) => onHandleBlock(e, index)}
                                    rows={8}
                                />
                                <Button type="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className="content">{data}</div>
                                <Button icon={<EditOutlined />} onClick={handleEdit}>
                                    Edit
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <Upload
                            onChange={handleImage}
                        >
                            <Button
                                icon={<UploadOutlined />}
                            >
                                upload
                            </Button>
                        </Upload>
                        <div>
                            {data && <img className='image' src={data} alt='/'></img>}
                        </div>
                    </div>

                )}
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        Modal.confirm({
                            title: 'Delete Block',
                            content: 'Are you sure you want to delete this block?',
                            onOk: () => onRemove(id),
                        });
                    }}
                >
                    Delete
                </Button>
            </div >
        </div >
    );
};

export default Block;
