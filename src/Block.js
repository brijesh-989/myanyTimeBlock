import React, { useState } from 'react';
import { Input, Button, Modal, Upload, Image } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import { EditOutlined, UploadOutlined, ItalicOutlined, BoldOutlined, UnderlineOutlined, CloseOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined, UploadOutlined, DragOutlined, ItalicOutlined, BoldOutlined, UnderlineOutlined, CloseOutlined } from '@ant-design/icons';
const { TextArea } = Input;
function Block ({ id, index, type, data, onRemove, onDragEnd, onDragStart, onDragOver, onHandleBlock, onHandleBlockImage }){
    const [isEditing, setEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [italic, setItalic] = useState(false);
    const [bold, setBold] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [isClickedItalic, setIsClickedItalic] = useState(false);
    const [isClickedBold, setIsClickedBold] = useState(false);
    const [isClickedUnderline, setIsClickedUnderline] = useState(false);
    const [isClickedEdit, setIsClickedEdit] = useState(false);
    const [isClickedUpload, setIsClickedUpload] = useState(false);
    const [isClickedClose, setIsClickedClose] = useState(false);
    const handleEdit = () => {
        setIsClickedEdit(true);
        setTimeout(() => {
            setEditing(true);
            setIsClickedEdit(false);
        }, 100);
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
    const handleImage = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
        onHandleBlockImage(index, imageUrl);
    }
   
    return (

        <div>
            {/* <DragDropContext> */}
                <div className='block' onClick={(e) => { e.stopPropagation() }}
                >
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
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ marginRight: 'auto' }}
                                        >

                                        </div>
                                        <EditOutlined
                                            onClick={handleEdit}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: isClickedEdit ? '#E26F19' : '', // Change color when clicked
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s', // Smooth transition for color change
                                            }}>
                                        </EditOutlined>
                                        <ItalicOutlined
                                            onClick={() => {
                                                setIsClickedItalic(true);
                                                setTimeout(() => {
                                                    setIsClickedItalic(false);
                                                }, 100); // Change 100 to the desired delay in milliseconds
                                                setItalic(!italic);
                                            }}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: isClickedItalic ? '#E26F19' : '', // Change color when clicked
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s', // Smooth transition for color change
                                            }}>

                                        </ItalicOutlined>
                                        <BoldOutlined
                                            onClick={() => {
                                                setIsClickedBold(true);
                                                setTimeout(() => {
                                                    setIsClickedBold(false);
                                                }, 100); // Change 100 to the desired delay in milliseconds
                                                setBold(!bold);
                                            }}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: isClickedBold ? '#E26F19' : '', // Change color when clicked
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s', // Smooth transition for color change
                                            }}>
                                        </BoldOutlined>
                                        <UnderlineOutlined
                                            onClick={() => {
                                                setIsClickedUnderline(true);
                                                setTimeout(() => {
                                                    setIsClickedUnderline(false);
                                                }, 100); // Change 100 to the desired delay in milliseconds
                                                setUnderline(!underline);
                                            }}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: isClickedUnderline ? '#E26F19' : '', // Change color when clicked
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s', // Smooth transition for color change
                                            }}>
                                        </UnderlineOutlined>
                                        <CloseOutlined
                                            onClick={() => {
                                                setIsClickedClose(true);
                                                setTimeout(() => {
                                                    setIsClickedClose(false);
                                                }, 100); // Change 100 to the desired delay in milliseconds

                                                Modal.confirm({
                                                    title: 'Delete Block',
                                                    content: 'Are you sure you want to delete this block?',
                                                    onOk: () => onRemove(id),
                                                });
                                            }}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: '50%',
                                                backgroundColor: isClickedClose ? '#E26F19' : '', // Change color when clicked
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s', // Smooth transition for color change
                                            }}
                                        >
                                        </CloseOutlined>
                                    </div>
                                    <div className='content'
                                        style={{
                                            fontStyle: italic ? 'italic' : 'normal',
                                            fontWeight: bold ? 'bold' : 'normal',
                                            textDecoration: underline ? 'underline' : 'none'
                                        }}
                                    >
                                        {data}
                                    </div>


                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: 'auto' }}
                                >
                                </div>
                                <Upload
                                    onChange={handleImage}
                                    showUploadList={false}
                                    style={{ marginLeft: 'auto' }}
                                >
                                    <UploadOutlined
                                        onClick={() => {
                                            setIsClickedUpload(true);
                                            setTimeout(() => {
                                                setIsClickedUpload(false);
                                            }, 100);
                                        }}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            backgroundColor: isClickedUpload ? '#E26F19' : '', // Change color when clicked
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s', // Smooth transition for color change
                                        }}
                                    />
                                </Upload>
                                <CloseOutlined
                                    onClick={() => {
                                        setIsClickedClose(true);
                                        setTimeout(() => {
                                            setIsClickedClose(false);
                                        }, 100); // Change 100 to the desired delay in milliseconds

                                        Modal.confirm({
                                            title: 'Delete Block',
                                            content: 'Are you sure you want to delete this block?',
                                            onOk: () => onRemove(id),
                                        });
                                    }}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        backgroundColor: isClickedClose ? '#E26F19' : '', // Change color when clicked
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s', // Smooth transition for color change
                                    }}

                                >
                                </CloseOutlined>
                            </div>
                            <div>
                                <Image
                                    width={200}
                                    src={data}
                                />
                            </div>
                        </div>
                    )}

                </div >
           
        </div >

    );
};
export default Block;
